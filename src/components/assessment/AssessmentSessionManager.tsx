import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AssessmentSessionManagerProps {
  assessmentId?: string;
  userId: string;
  sessionId: string;
  onSessionUpdate: (sessionId: string) => void;
}

export function AssessmentSessionManager({ 
  assessmentId, 
  userId, 
  sessionId, 
  onSessionUpdate 
}: AssessmentSessionManagerProps) {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Monitor session activity and prevent duplicate sessions
  useEffect(() => {
    if (!assessmentId || !userId) return;

    const manageSession = async () => {
      try {
        // Check for existing active sessions
        const { data: existingSessions, error: checkError } = await supabase
          .from('interview_sessions')
          .select('*')
          .eq('assessment_id', assessmentId)
          .eq('user_id', userId)
          .eq('completed', false);

        if (checkError) throw checkError;

        // If there's an existing session and we don't have a sessionId, use it
        if (existingSessions && existingSessions.length > 0 && !sessionId) {
          const activeSession = existingSessions[0];
          onSessionUpdate(activeSession.id);
          
          // Update last activity
          await (supabase as any)
            .from('interview_sessions')
            .update({ updated_at: new Date().toISOString() })
            .eq('id', activeSession.id);
        }

      } catch (error) {
        console.error('Error managing session:', error);
        toast({
          title: 'Session Error',
          description: 'Failed to manage assessment session.',
          variant: 'destructive'
        });
      }
    };

    manageSession();
  }, [assessmentId, userId, sessionId, onSessionUpdate, toast]);

  // Update last activity periodically
  useEffect(() => {
    if (!sessionId || !isActive) return;

    const activityInterval = setInterval(async () => {
      try {
        await (supabase as any)
          .from('interview_sessions')
          .update({ updated_at: new Date().toISOString() })
          .eq('id', sessionId);
        
        setLastActivity(Date.now());
      } catch (error) {
        console.error('Error updating activity:', error);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(activityInterval);
  }, [sessionId, isActive]);

  // Monitor for session timeout or inactivity
  useEffect(() => {
    if (!sessionId) return;

    const checkSessionValidity = async () => {
      try {
        const { data: session, error } = await supabase
          .from('interview_sessions')
          .select('*')
          .eq('id', sessionId)
          .single();

        if (error || !session) {
          // Session expired or invalid
          toast({
            title: 'Session Expired',
            description: 'Your assessment session has expired. Please restart.',
            variant: 'destructive'
          });
          setIsActive(false);
          return;
        }

        // Check if session is completed
        if (session.completed) {
          setIsActive(false);
          return;
        }

        // Check for timeout (assuming 2x the assessment duration)
        const maxInactiveTime = (session.time_remaining_seconds || 3600) * 2 * 1000; // 2x duration in ms
        const timeSinceLastActivity = Date.now() - new Date(session.updated_at).getTime();
        
        if (timeSinceLastActivity > maxInactiveTime) {
          toast({
            title: 'Session Timeout',
            description: 'Your session has timed out due to inactivity.',
            variant: 'destructive'
          });
          setIsActive(false);
        }

      } catch (error) {
        console.error('Error checking session validity:', error);
      }
    };

    const validityInterval = setInterval(checkSessionValidity, 60000); // Check every minute
    return () => clearInterval(validityInterval);
  }, [sessionId, toast]);

  // Prevent duplicate sessions by checking before creating new ones
  const createNewSession = async (assessmentId: string, userId: string, timeRemaining: number) => {
    try {
      // First, check for existing incomplete sessions
      const { data: existingSessions } = await (supabase as any)
        .from('interview_sessions')
        .select('id')
        .eq('interview_id', assessmentId)
        .eq('user_id', userId)
        .eq('completed', false);

      if (existingSessions && existingSessions.length > 0) {
        return existingSessions[0].id;
      }

      const { data: newSession, error } = await (supabase as any)
        .from('interview_sessions')
        .insert({
          interview_id: assessmentId,
          user_id: userId,
          time_remaining_seconds: timeRemaining,
          current_question_index: 0,
          completed: false
        })
        .select('id')
        .single();

      if (error) throw error;
      return newSession.id;

    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  };

  // Session cleanup on unmount
  useEffect(() => {
    return () => {
      // Cleanup logic if needed
      setIsActive(false);
    };
  }, []);

  // Don't render anything visible - this is a background manager
  return null;
}