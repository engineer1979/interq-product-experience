import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Clock, CheckCircle, Star, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import EnhancedFooter from "@/components/EnhancedFooter";
import { cn } from "@/lib/utils";

const experts = [
  { id: "1", name: "Dr. Sarah Mitchell", role: "Technical Expert", avatar: "", specialization: "Software Engineering", rating: 4.9 },
  { id: "2", name: "James Rodriguez", role: "HR Expert", avatar: "", specialization: "Behavioral Assessment", rating: 4.8 },
  { id: "3", name: "Priya Sharma", role: "Domain Expert", avatar: "", specialization: "Data Science & AI", rating: 4.7 },
];

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
];

const BookSession = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedExpert, setSelectedExpert] = useState(experts[0]);
  const [step, setStep] = useState<"expert" | "schedule" | "confirm">("expert");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleConfirmBooking = () => {
    toast({
      title: "Session Booked!",
      description: `Your session with ${selectedExpert.name} is confirmed for ${selectedDate?.toLocaleDateString()} at ${selectedTime}.`,
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <EnhancedNavigation />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Book a Session</h1>
            <p className="text-muted-foreground text-lg">Schedule a session with one of our experts.</p>
          </motion.div>

          {/* Steps indicator */}
          <div className="flex items-center gap-4 mb-10">
            {[
              { key: "expert", label: "Select Expert" },
              { key: "schedule", label: "Pick Date & Time" },
              { key: "confirm", label: "Confirm" },
            ].map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all",
                  step === s.key ? "bg-primary text-primary-foreground border-primary" :
                  (["expert", "schedule", "confirm"].indexOf(step) > i ? "bg-primary/20 text-primary border-primary/40" : "bg-muted text-muted-foreground border-border")
                )}>
                  {["expert", "schedule", "confirm"].indexOf(step) > i ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={cn("text-sm font-medium hidden sm:inline", step === s.key ? "text-foreground" : "text-muted-foreground")}>{s.label}</span>
                {i < 2 && <div className="w-8 h-px bg-border hidden sm:block" />}
              </div>
            ))}
          </div>

          {/* Step 1: Select Expert */}
          {step === "expert" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid sm:grid-cols-3 gap-6">
              {experts.map((expert) => (
                <Card
                  key={expert.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-elegant border-2",
                    selectedExpert.id === expert.id ? "border-primary shadow-elegant" : "border-border hover:border-primary/30"
                  )}
                  onClick={() => setSelectedExpert(expert)}
                >
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-4 border-2 border-primary/20">
                      <AvatarImage src={expert.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                        {expert.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-lg mb-1">{expert.name}</h3>
                    <Badge variant="secondary" className="mb-2">{expert.role}</Badge>
                    <p className="text-sm text-muted-foreground mb-3">{expert.specialization}</p>
                    <div className="flex items-center justify-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{expert.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="sm:col-span-3 flex justify-end mt-4">
                <Button onClick={() => setStep("schedule")} size="lg" className="px-8">
                  Continue <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Calendar & Time Slots */}
          {step === "schedule" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Selected expert banner */}
              <Card className="mb-6 border-primary/20 bg-primary/5">
                <CardContent className="p-4 flex items-center gap-4">
                  <Avatar className="w-10 h-10 border border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                      {selectedExpert.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{selectedExpert.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedExpert.specialization}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setStep("expert")}>Change</Button>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Calendar */}
                <Card className="shadow-soft">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-primary" /> Select Date
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                      className="rounded-xl pointer-events-auto"
                    />
                  </CardContent>
                </Card>

                {/* Time Slots */}
                <Card className="shadow-soft">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" /> Available Time Slots
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedDate ? (
                      <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={cn(
                              "p-3 rounded-xl text-sm font-medium border-2 transition-all hover:shadow-sm",
                              selectedTime === time
                                ? "border-primary bg-primary text-primary-foreground shadow-md"
                                : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"
                            )}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                        <CalendarDays className="w-12 h-12 mb-3 opacity-30" />
                        <p className="text-sm">Please select a date first</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setStep("expert")}>Back</Button>
                <Button
                  onClick={() => setStep("confirm")}
                  size="lg"
                  disabled={!selectedDate || !selectedTime}
                  className="px-8"
                >
                  Review Booking
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {step === "confirm" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg mx-auto">
              <Card className="shadow-elegant border-2 border-primary/20">
                <CardHeader className="text-center border-b border-border pb-6">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                  <CardTitle className="text-2xl">Confirm Your Booking</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                    <Avatar className="w-12 h-12 border border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {selectedExpert.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">{selectedExpert.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedExpert.specialization}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <p className="text-xs text-muted-foreground mb-1">Date</p>
                      <p className="font-semibold">{selectedDate?.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" })}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <p className="text-xs text-muted-foreground mb-1">Time</p>
                      <p className="font-semibold">{selectedTime}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" onClick={() => setStep("schedule")} className="flex-1">Back</Button>
                    <Button onClick={handleConfirmBooking} className="flex-1" size="lg">
                      Confirm Booking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
      <EnhancedFooter />
    </div>
  );
};

export default BookSession;
