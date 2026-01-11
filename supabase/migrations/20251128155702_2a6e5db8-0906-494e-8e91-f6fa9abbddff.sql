-- Insert Network Engineer Test (35 MCQs, 60 minutes)
WITH new_assessment AS (
  INSERT INTO assessments (
    title, description, category, difficulty, duration_minutes, passing_score,
    timer_enabled, auto_submit_on_timeout, tab_switch_detection, max_tab_switches,
    face_detection_enabled, proctoring_enabled, is_published, created_by
  ) VALUES (
    'Network Engineer Technical Test',
    'Advanced assessment covering TCP/IP, routing protocols (OSPF, BGP), network security, VLANs, VPN technologies, wireless networking, and network monitoring tools.',
    'Networking & Infrastructure',
    'advanced',
    60,
    75,
    true,
    true,
    true,
    2,
    true,
    true,
    true,
    (SELECT id FROM auth.users LIMIT 1)
  ) RETURNING id
)
INSERT INTO assessment_questions (assessment_id, question_text, question_type, options, correct_answer, points, order_index) 
SELECT id, question_text, question_type, options, correct_answer, points, order_index
FROM new_assessment, (VALUES
  -- TCP/IP Protocol Suite (7 questions)
  ('What layer of the OSI model does TCP operate at?', 'multiple_choice', '["Transport Layer", "Network Layer", "Application Layer", "Data Link Layer"]'::jsonb, 'Transport Layer', 3, 1),
  ('What is the purpose of the three-way handshake in TCP?', 'multiple_choice', '["Establish reliable connection", "Encrypt data", "Route packets", "Compress data"]'::jsonb, 'Establish reliable connection', 3, 2),
  ('What is the default subnet mask for a Class C network?', 'multiple_choice', '["255.255.255.0", "255.255.0.0", "255.0.0.0", "255.255.255.128"]'::jsonb, '255.255.255.0', 3, 3),
  ('What protocol is used to automatically assign IP addresses?', 'multiple_choice', '["DHCP", "DNS", "ARP", "ICMP"]'::jsonb, 'DHCP', 3, 4),
  ('What is the purpose of ARP (Address Resolution Protocol)?', 'multiple_choice', '["Map IP addresses to MAC addresses", "Route packets", "Encrypt traffic", "Assign IP addresses"]'::jsonb, 'Map IP addresses to MAC addresses', 3, 5),
  ('Which protocol does ping use?', 'multiple_choice', '["ICMP", "TCP", "UDP", "HTTP"]'::jsonb, 'ICMP', 3, 6),
  ('What is the maximum TTL (Time to Live) value?', 'multiple_choice', '["255", "128", "64", "1024"]'::jsonb, '255', 3, 7),
  
  -- Routing Protocols (6 questions)
  ('What type of routing protocol is OSPF?', 'multiple_choice', '["Link-state protocol", "Distance-vector protocol", "Hybrid protocol", "Static protocol"]'::jsonb, 'Link-state protocol', 3, 8),
  ('What is BGP primarily used for?', 'multiple_choice', '["Inter-domain routing between autonomous systems", "Intra-domain routing", "Local area network routing", "VPN connections"]'::jsonb, 'Inter-domain routing between autonomous systems', 3, 9),
  ('What is the administrative distance of OSPF?', 'multiple_choice', '["110", "90", "120", "100"]'::jsonb, '110', 3, 10),
  ('What is the metric used by RIP?', 'multiple_choice', '["Hop count", "Bandwidth", "Delay", "Cost"]'::jsonb, 'Hop count', 3, 11),
  ('What is a routing loop?', 'multiple_choice', '["Packets circulate endlessly between routers", "Router hardware failure", "Network congestion", "Firewall blocking traffic"]'::jsonb, 'Packets circulate endlessly between routers', 3, 12),
  ('What is the purpose of split horizon in RIP?', 'multiple_choice', '["Prevent routing loops", "Increase bandwidth", "Encrypt routing updates", "Balance load"]'::jsonb, 'Prevent routing loops', 3, 13),
  
  -- Network Security & Firewalls (5 questions)
  ('What is a stateful firewall?', 'multiple_choice', '["Tracks connection state and allows return traffic", "Filters based on IP addresses only", "Blocks all incoming traffic", "Encrypts all traffic"]'::jsonb, 'Tracks connection state and allows return traffic', 3, 14),
  ('What is the purpose of a DMZ?', 'multiple_choice', '["Isolate public-facing servers from internal network", "Speed up internet connection", "Store backup data", "Manage IP addresses"]'::jsonb, 'Isolate public-facing servers from internal network', 3, 15),
  ('What does IDS stand for?', 'multiple_choice', '["Intrusion Detection System", "Internet Data Service", "Internal Domain Server", "IP Distribution System"]'::jsonb, 'Intrusion Detection System', 3, 16),
  ('What is port scanning used for?', 'multiple_choice', '["Identify open ports and services", "Speed up network", "Encrypt data", "Assign IP addresses"]'::jsonb, 'Identify open ports and services', 3, 17),
  ('What is the difference between IDS and IPS?', 'multiple_choice', '["IPS can block threats, IDS only detects", "IDS is faster", "IPS is cheaper", "No difference"]'::jsonb, 'IPS can block threats, IDS only detects', 3, 18),
  
  -- VLANs & Switching (5 questions)
  ('What is a VLAN?', 'multiple_choice', '["Virtual Local Area Network - logical network segmentation", "Virtual Private Network", "Very Large Area Network", "Virtual Link Access Node"]'::jsonb, 'Virtual Local Area Network - logical network segmentation', 3, 19),
  ('What protocol is used for VLAN trunking?', 'multiple_choice', '["802.1Q", "802.11", "802.3", "802.15"]'::jsonb, '802.1Q', 3, 20),
  ('What is the purpose of Spanning Tree Protocol (STP)?', 'multiple_choice', '["Prevent network loops in switched networks", "Encrypt traffic", "Assign VLANs", "Route packets"]'::jsonb, 'Prevent network loops in switched networks', 3, 21),
  ('What is the native VLAN used for?', 'multiple_choice', '["Untagged traffic on trunk ports", "Management traffic only", "Voice traffic", "Guest network"]'::jsonb, 'Untagged traffic on trunk ports', 3, 22),
  ('What is MAC address flooding?', 'multiple_choice', '["Attack that overflows switch MAC table", "Normal network operation", "VLAN configuration", "Routing protocol"]'::jsonb, 'Attack that overflows switch MAC table', 3, 23),
  
  -- VPN Technologies (4 questions)
  ('What does VPN stand for?', 'multiple_choice', '["Virtual Private Network", "Very Private Node", "Virtual Public Network", "Verified Private Node"]'::jsonb, 'Virtual Private Network', 3, 24),
  ('What protocol is commonly used for site-to-site VPNs?', 'multiple_choice', '["IPSec", "HTTP", "FTP", "SMTP"]'::jsonb, 'IPSec', 3, 25),
  ('What is the purpose of a VPN tunnel?', 'multiple_choice', '["Create encrypted connection over public network", "Increase bandwidth", "Block malicious traffic", "Assign IP addresses"]'::jsonb, 'Create encrypted connection over public network', 3, 26),
  ('What is split tunneling in VPN?', 'multiple_choice', '["Route some traffic through VPN, some directly", "Two separate VPN connections", "Backup VPN path", "VPN load balancing"]'::jsonb, 'Route some traffic through VPN, some directly', 3, 27),
  
  -- Wireless Networking (4 questions)
  ('What frequency does 802.11ac operate on?', 'multiple_choice', '["5 GHz", "2.4 GHz", "Both 2.4 and 5 GHz", "6 GHz"]'::jsonb, '5 GHz', 3, 28),
  ('What is WPA3?', 'multiple_choice', '["Latest Wi-Fi security protocol", "Wireless access point", "Network cable standard", "Router firmware"]'::jsonb, 'Latest Wi-Fi security protocol', 3, 29),
  ('What is an SSID?', 'multiple_choice', '["Service Set Identifier - wireless network name", "Secure Socket ID", "System Security ID", "Server Set ID"]'::jsonb, 'Service Set Identifier - wireless network name', 3, 30),
  ('What is channel bonding in Wi-Fi?', 'multiple_choice', '["Combine channels to increase bandwidth", "Secure channel encryption", "Channel assignment protocol", "Backup channel system"]'::jsonb, 'Combine channels to increase bandwidth', 3, 31),
  
  -- Network Monitoring Tools (4 questions)
  ('What does Wireshark do?', 'multiple_choice', '["Captures and analyzes network packets", "Tests network speed", "Configures routers", "Blocks malicious traffic"]'::jsonb, 'Captures and analyzes network packets', 3, 32),
  ('What is the purpose of traceroute?', 'multiple_choice', '["Show path packets take to destination", "Test bandwidth", "Configure routing", "Block traffic"]'::jsonb, 'Show path packets take to destination', 3, 33),
  ('What does SNMP stand for?', 'multiple_choice', '["Simple Network Management Protocol", "Secure Network Monitor Protocol", "System Network Map Protocol", "Standard Network Metric Protocol"]'::jsonb, 'Simple Network Management Protocol', 3, 34),
  ('What is NetFlow used for?', 'multiple_choice', '["Monitor network traffic patterns and bandwidth usage", "Configure switches", "Block attacks", "Assign IP addresses"]'::jsonb, 'Monitor network traffic patterns and bandwidth usage', 3, 35)
) AS questions(question_text, question_type, options, correct_answer, points, order_index);