export type SolutionResult = {
  found: boolean;
  solution: Solution | null;
};

export type Solution = {
  id: string;
  title: string;
  description: string;
  steps: string[];
  verified: boolean;
  confidence: number;
  usageCount: number;
  lastUsed: string;
  tags: string[];
  links: { title: string; url: string }[];
  documents: { name: string; type: string }[];
  createdAt: string; // ISO date string
};

export const solutions: Solution[] = [
  {
    id: "SOL-001",
    title: "Stepper Motor Stalling at High Speeds",
    description:
      "Technician-confirmed steps to troubleshoot the issue: stepper motor stalling at high speeds.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.94,
    usageCount: 16,
    lastUsed: "3 hours ago",
    tags: ["firmware", "controller", "relay"],
    links: [
      {
        title: "Guide for Stepper Motor Stalling at High Speeds",
        url: "https://docs.industrial.support/solution/sol-1/guide",
      },
      {
        title: "FAQ for Stepper Motor Stalling at High Speeds",
        url: "https://docs.internal/faq/sol-1",
      },
    ],
    documents: [
      {
        name: "Stepper Motor Stalling at High Speeds Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Stepper Motor Stalling at High Speeds Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T12:00:00Z",
  },
  {
    id: "SOL-002",
    title: "Inconsistent Temperature Sensor Output",
    description:
      "Technician-confirmed steps to troubleshoot the issue: inconsistent temperature sensor output.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.79,
    usageCount: 22,
    lastUsed: "1 hours ago",
    tags: ["pressure", "hydraulic", "alarm"],
    links: [
      {
        title: "Guide for Inconsistent Temperature Sensor Output",
        url: "https://docs.industrial.support/solution/sol-2/guide",
      },
      {
        title: "FAQ for Inconsistent Temperature Sensor Output",
        url: "https://docs.internal/faq/sol-2",
      },
    ],
    documents: [
      {
        name: "Inconsistent Temperature Sensor Output Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inconsistent Temperature Sensor Output Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T11:45:00Z",
  },
  {
    id: "SOL-003",
    title: "Hydraulic Pump Fails to Start",
    description:
      "Technician-confirmed steps to troubleshoot the issue: hydraulic pump fails to start.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.88,
    usageCount: 10,
    lastUsed: "2 hours ago",
    tags: ["controller", "alarm", "network"],
    links: [
      {
        title: "Guide for Hydraulic Pump Fails to Start",
        url: "https://docs.industrial.support/solution/sol-3/guide",
      },
      {
        title: "FAQ for Hydraulic Pump Fails to Start",
        url: "https://docs.internal/faq/sol-3",
      },
    ],
    documents: [
      {
        name: "Hydraulic Pump Fails to Start Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Hydraulic Pump Fails to Start Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T11:30:00Z",
  },
  {
    id: "SOL-004",
    title: "Vibration Levels Exceeding Threshold",
    description:
      "Technician-confirmed steps to troubleshoot the issue: vibration levels exceeding threshold.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.82,
    usageCount: 19,
    lastUsed: "9 hours ago",
    tags: ["communication", "controller", "motor"],
    links: [
      {
        title: "Guide for Vibration Levels Exceeding Threshold",
        url: "https://docs.industrial.support/solution/sol-4/guide",
      },
      {
        title: "FAQ for Vibration Levels Exceeding Threshold",
        url: "https://docs.internal/faq/sol-4",
      },
    ],
    documents: [
      {
        name: "Vibration Levels Exceeding Threshold Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Vibration Levels Exceeding Threshold Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T11:15:00Z",
  },
  {
    id: "SOL-005",
    title: "PLC Not Recognizing Input Module",
    description:
      "Technician-confirmed steps to troubleshoot the issue: plc not recognizing input module.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.84,
    usageCount: 22,
    lastUsed: "8 hours ago",
    tags: ["controller", "calibration", "pressure"],
    links: [
      {
        title: "Guide for PLC Not Recognizing Input Module",
        url: "https://docs.industrial.support/solution/sol-5/guide",
      },
      {
        title: "FAQ for PLC Not Recognizing Input Module",
        url: "https://docs.internal/faq/sol-5",
      },
    ],
    documents: [
      {
        name: "PLC Not Recognizing Input Module Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PLC Not Recognizing Input Module Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T11:00:00Z",
  },
  {
    id: "SOL-006",
    title: "Slow Network Response from Control System",
    description:
      "Technician-confirmed steps to troubleshoot the issue: slow network response from control system.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.82,
    usageCount: 10,
    lastUsed: "1 hours ago",
    tags: ["network", "pressure", "communication"],
    links: [
      {
        title: "Guide for Slow Network Response from Control System",
        url: "https://docs.industrial.support/solution/sol-6/guide",
      },
      {
        title: "FAQ for Slow Network Response from Control System",
        url: "https://docs.internal/faq/sol-6",
      },
    ],
    documents: [
      {
        name: "Slow Network Response from Control System Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Slow Network Response from Control System Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T10:45:00Z",
  },
  {
    id: "SOL-007",
    title: "Unexpected Alarm on Cooling Fan",
    description:
      "Technician-confirmed steps to troubleshoot the issue: unexpected alarm on cooling fan.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.87,
    usageCount: 24,
    lastUsed: "4 hours ago",
    tags: ["vibration", "network", "hydraulic"],
    links: [
      {
        title: "Guide for Unexpected Alarm on Cooling Fan",
        url: "https://docs.industrial.support/solution/sol-7/guide",
      },
      {
        title: "FAQ for Unexpected Alarm on Cooling Fan",
        url: "https://docs.internal/faq/sol-7",
      },
    ],
    documents: [
      {
        name: "Unexpected Alarm on Cooling Fan Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Unexpected Alarm on Cooling Fan Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T10:30:00Z",
  },
  {
    id: "SOL-008",
    title: "Pressure Valve Misreporting Readings",
    description:
      "Technician-confirmed steps to troubleshoot the issue: pressure valve misreporting readings.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.82,
    usageCount: 11,
    lastUsed: "9 hours ago",
    tags: ["plc", "calibration", "alarm"],
    links: [
      {
        title: "Guide for Pressure Valve Misreporting Readings",
        url: "https://docs.industrial.support/solution/sol-8/guide",
      },
      {
        title: "FAQ for Pressure Valve Misreporting Readings",
        url: "https://docs.internal/faq/sol-8",
      },
    ],
    documents: [
      {
        name: "Pressure Valve Misreporting Readings Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Pressure Valve Misreporting Readings Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T10:15:00Z",
  },
  {
    id: "SOL-009",
    title: "Firmware Update Failure on Controller",
    description:
      "Technician-confirmed steps to troubleshoot the issue: firmware update failure on controller.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.79,
    usageCount: 12,
    lastUsed: "1 hours ago",
    tags: ["vibration", "temperature", "alarm"],
    links: [
      {
        title: "Guide for Firmware Update Failure on Controller",
        url: "https://docs.industrial.support/solution/sol-9/guide",
      },
      {
        title: "FAQ for Firmware Update Failure on Controller",
        url: "https://docs.internal/faq/sol-9",
      },
    ],
    documents: [
      {
        name: "Firmware Update Failure on Controller Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Firmware Update Failure on Controller Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T10:00:00Z",
  },
  {
    id: "SOL-010",
    title: "Relay Module Not Engaging",
    description: "Technician-confirmed steps to troubleshoot the issue: relay module not engaging.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.94,
    usageCount: 3,
    lastUsed: "6 hours ago",
    tags: ["temperature", "controller", "vibration"],
    links: [
      {
        title: "Guide for Relay Module Not Engaging",
        url: "https://docs.industrial.support/solution/sol-10/guide",
      },
      {
        title: "FAQ for Relay Module Not Engaging",
        url: "https://docs.internal/faq/sol-10",
      },
    ],
    documents: [
      {
        name: "Relay Module Not Engaging Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Relay Module Not Engaging Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T09:45:00Z",
  },
  {
    id: "SOL-011",
    title: "Overvoltage Detected in Control Cabinet",
    description:
      "Technician-confirmed steps to troubleshoot the issue: overvoltage detected in control cabinet.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.8,
    usageCount: 11,
    lastUsed: "2 hours ago",
    tags: ["hydraulic", "firmware", "calibration"],
    links: [
      {
        title: "Guide for Overvoltage Detected in Control Cabinet",
        url: "https://docs.industrial.support/solution/sol-11/guide",
      },
      {
        title: "FAQ for Overvoltage Detected in Control Cabinet",
        url: "https://docs.internal/faq/sol-11",
      },
    ],
    documents: [
      {
        name: "Overvoltage Detected in Control Cabinet Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Overvoltage Detected in Control Cabinet Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T09:30:00Z",
  },
  {
    id: "SOL-012",
    title: "Analog Signal Clipping at ADC Input",
    description:
      "Technician-confirmed steps to troubleshoot the issue: analog signal clipping at adc input.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.82,
    usageCount: 23,
    lastUsed: "6 hours ago",
    tags: ["controller", "alarm", "plc"],
    links: [
      {
        title: "Guide for Analog Signal Clipping at ADC Input",
        url: "https://docs.industrial.support/solution/sol-12/guide",
      },
      {
        title: "FAQ for Analog Signal Clipping at ADC Input",
        url: "https://docs.internal/faq/sol-12",
      },
    ],
    documents: [
      {
        name: "Analog Signal Clipping at ADC Input Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Analog Signal Clipping at ADC Input Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T09:15:00Z",
  },
  {
    id: "SOL-013",
    title: "Inverter Module Communication Timeout",
    description:
      "Technician-confirmed steps to troubleshoot the issue: inverter module communication timeout.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.91,
    usageCount: 5,
    lastUsed: "5 hours ago",
    tags: ["calibration", "relay", "plc"],
    links: [
      {
        title: "Guide for Inverter Module Communication Timeout",
        url: "https://docs.industrial.support/solution/sol-13/guide",
      },
      {
        title: "FAQ for Inverter Module Communication Timeout",
        url: "https://docs.internal/faq/sol-13",
      },
    ],
    documents: [
      {
        name: "Inverter Module Communication Timeout Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inverter Module Communication Timeout Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T09:00:00Z",
  },
  {
    id: "SOL-014",
    title: "Sudden Drop in Production Line Speed",
    description:
      "Technician-confirmed steps to troubleshoot the issue: sudden drop in production line speed.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.85,
    usageCount: 25,
    lastUsed: "6 hours ago",
    tags: ["pressure", "motor", "alarm"],
    links: [
      {
        title: "Guide for Sudden Drop in Production Line Speed",
        url: "https://docs.industrial.support/solution/sol-14/guide",
      },
      {
        title: "FAQ for Sudden Drop in Production Line Speed",
        url: "https://docs.internal/faq/sol-14",
      },
    ],
    documents: [
      {
        name: "Sudden Drop in Production Line Speed Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Sudden Drop in Production Line Speed Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T08:45:00Z",
  },
  {
    id: "SOL-015",
    title: "PID Loop Oscillations in Temperature Control",
    description:
      "Technician-confirmed steps to troubleshoot the issue: pid loop oscillations in temperature control.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.91,
    usageCount: 17,
    lastUsed: "8 hours ago",
    tags: ["firmware", "network", "hydraulic"],
    links: [
      {
        title: "Guide for PID Loop Oscillations in Temperature Control",
        url: "https://docs.industrial.support/solution/sol-15/guide",
      },
      {
        title: "FAQ for PID Loop Oscillations in Temperature Control",
        url: "https://docs.internal/faq/sol-15",
      },
    ],
    documents: [
      {
        name: "PID Loop Oscillations in Temperature Control Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PID Loop Oscillations in Temperature Control Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T08:30:00Z",
  },
  {
    id: "SOL-016",
    title: "Stepper Motor Stalling at High Speeds",
    description:
      "Technician-confirmed steps to troubleshoot the issue: stepper motor stalling at high speeds.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.8,
    usageCount: 20,
    lastUsed: "10 hours ago",
    tags: ["alarm", "sensor", "firmware"],
    links: [
      {
        title: "Guide for Stepper Motor Stalling at High Speeds",
        url: "https://docs.industrial.support/solution/sol-16/guide",
      },
      {
        title: "FAQ for Stepper Motor Stalling at High Speeds",
        url: "https://docs.internal/faq/sol-16",
      },
    ],
    documents: [
      {
        name: "Stepper Motor Stalling at High Speeds Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Stepper Motor Stalling at High Speeds Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T08:15:00Z",
  },
  {
    id: "SOL-017",
    title: "Inconsistent Temperature Sensor Output",
    description:
      "Technician-confirmed steps to troubleshoot the issue: inconsistent temperature sensor output.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.88,
    usageCount: 8,
    lastUsed: "2 hours ago",
    tags: ["motor", "communication", "relay"],
    links: [
      {
        title: "Guide for Inconsistent Temperature Sensor Output",
        url: "https://docs.industrial.support/solution/sol-17/guide",
      },
      {
        title: "FAQ for Inconsistent Temperature Sensor Output",
        url: "https://docs.internal/faq/sol-17",
      },
    ],
    documents: [
      {
        name: "Inconsistent Temperature Sensor Output Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inconsistent Temperature Sensor Output Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T08:00:00Z",
  },
  {
    id: "SOL-018",
    title: "Hydraulic Pump Fails to Start",
    description:
      "Technician-confirmed steps to troubleshoot the issue: hydraulic pump fails to start.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.89,
    usageCount: 11,
    lastUsed: "1 hours ago",
    tags: ["network", "sensor", "motor"],
    links: [
      {
        title: "Guide for Hydraulic Pump Fails to Start",
        url: "https://docs.industrial.support/solution/sol-18/guide",
      },
      {
        title: "FAQ for Hydraulic Pump Fails to Start",
        url: "https://docs.internal/faq/sol-18",
      },
    ],
    documents: [
      {
        name: "Hydraulic Pump Fails to Start Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Hydraulic Pump Fails to Start Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T07:45:00Z",
  },
  {
    id: "SOL-019",
    title: "Vibration Levels Exceeding Threshold",
    description:
      "Technician-confirmed steps to troubleshoot the issue: vibration levels exceeding threshold.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.88,
    usageCount: 19,
    lastUsed: "3 hours ago",
    tags: ["hydraulic", "vibration", "plc"],
    links: [
      {
        title: "Guide for Vibration Levels Exceeding Threshold",
        url: "https://docs.industrial.support/solution/sol-19/guide",
      },
      {
        title: "FAQ for Vibration Levels Exceeding Threshold",
        url: "https://docs.internal/faq/sol-19",
      },
    ],
    documents: [
      {
        name: "Vibration Levels Exceeding Threshold Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Vibration Levels Exceeding Threshold Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T07:30:00Z",
  },
  {
    id: "SOL-020",
    title: "PLC Not Recognizing Input Module",
    description:
      "Technician-confirmed steps to troubleshoot the issue: plc not recognizing input module.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.96,
    usageCount: 16,
    lastUsed: "9 hours ago",
    tags: ["calibration", "temperature", "network"],
    links: [
      {
        title: "Guide for PLC Not Recognizing Input Module",
        url: "https://docs.industrial.support/solution/sol-20/guide",
      },
      {
        title: "FAQ for PLC Not Recognizing Input Module",
        url: "https://docs.internal/faq/sol-20",
      },
    ],
    documents: [
      {
        name: "PLC Not Recognizing Input Module Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PLC Not Recognizing Input Module Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T07:15:00Z",
  },
  {
    id: "SOL-021",
    title: "Slow Network Response from Control System",
    description:
      "Technician-confirmed steps to troubleshoot the issue: slow network response from control system.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.93,
    usageCount: 20,
    lastUsed: "4 hours ago",
    tags: ["firmware", "motor", "pressure"],
    links: [
      {
        title: "Guide for Slow Network Response from Control System",
        url: "https://docs.industrial.support/solution/sol-21/guide",
      },
      {
        title: "FAQ for Slow Network Response from Control System",
        url: "https://docs.internal/faq/sol-21",
      },
    ],
    documents: [
      {
        name: "Slow Network Response from Control System Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Slow Network Response from Control System Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T07:00:00Z",
  },
  {
    id: "SOL-022",
    title: "Unexpected Alarm on Cooling Fan",
    description:
      "Technician-confirmed steps to troubleshoot the issue: unexpected alarm on cooling fan.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.85,
    usageCount: 5,
    lastUsed: "9 hours ago",
    tags: ["sensor", "hydraulic", "relay"],
    links: [
      {
        title: "Guide for Unexpected Alarm on Cooling Fan",
        url: "https://docs.industrial.support/solution/sol-22/guide",
      },
      {
        title: "FAQ for Unexpected Alarm on Cooling Fan",
        url: "https://docs.internal/faq/sol-22",
      },
    ],
    documents: [
      {
        name: "Unexpected Alarm on Cooling Fan Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Unexpected Alarm on Cooling Fan Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T06:45:00Z",
  },
  {
    id: "SOL-023",
    title: "Pressure Valve Misreporting Readings",
    description:
      "Technician-confirmed steps to troubleshoot the issue: pressure valve misreporting readings.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.89,
    usageCount: 22,
    lastUsed: "4 hours ago",
    tags: ["relay", "network", "vibration"],
    links: [
      {
        title: "Guide for Pressure Valve Misreporting Readings",
        url: "https://docs.industrial.support/solution/sol-23/guide",
      },
      {
        title: "FAQ for Pressure Valve Misreporting Readings",
        url: "https://docs.internal/faq/sol-23",
      },
    ],
    documents: [
      {
        name: "Pressure Valve Misreporting Readings Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Pressure Valve Misreporting Readings Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T06:30:00Z",
  },
  {
    id: "SOL-024",
    title: "Firmware Update Failure on Controller",
    description:
      "Technician-confirmed steps to troubleshoot the issue: firmware update failure on controller.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.95,
    usageCount: 21,
    lastUsed: "4 hours ago",
    tags: ["temperature", "motor", "communication"],
    links: [
      {
        title: "Guide for Firmware Update Failure on Controller",
        url: "https://docs.industrial.support/solution/sol-24/guide",
      },
      {
        title: "FAQ for Firmware Update Failure on Controller",
        url: "https://docs.internal/faq/sol-24",
      },
    ],
    documents: [
      {
        name: "Firmware Update Failure on Controller Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Firmware Update Failure on Controller Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T06:15:00Z",
  },
  {
    id: "SOL-025",
    title: "Relay Module Not Engaging",
    description: "Technician-confirmed steps to troubleshoot the issue: relay module not engaging.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.96,
    usageCount: 25,
    lastUsed: "5 hours ago",
    tags: ["plc", "controller", "motor"],
    links: [
      {
        title: "Guide for Relay Module Not Engaging",
        url: "https://docs.industrial.support/solution/sol-25/guide",
      },
      {
        title: "FAQ for Relay Module Not Engaging",
        url: "https://docs.internal/faq/sol-25",
      },
    ],
    documents: [
      {
        name: "Relay Module Not Engaging Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Relay Module Not Engaging Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T06:00:00Z",
  },
  {
    id: "SOL-026",
    title: "Overvoltage Detected in Control Cabinet",
    description:
      "Technician-confirmed steps to troubleshoot the issue: overvoltage detected in control cabinet.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.92,
    usageCount: 13,
    lastUsed: "2 hours ago",
    tags: ["vibration", "calibration", "plc"],
    links: [
      {
        title: "Guide for Overvoltage Detected in Control Cabinet",
        url: "https://docs.industrial.support/solution/sol-26/guide",
      },
      {
        title: "FAQ for Overvoltage Detected in Control Cabinet",
        url: "https://docs.internal/faq/sol-26",
      },
    ],
    documents: [
      {
        name: "Overvoltage Detected in Control Cabinet Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Overvoltage Detected in Control Cabinet Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T05:45:00Z",
  },
  {
    id: "SOL-027",
    title: "Analog Signal Clipping at ADC Input",
    description:
      "Technician-confirmed steps to troubleshoot the issue: analog signal clipping at adc input.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.85,
    usageCount: 3,
    lastUsed: "4 hours ago",
    tags: ["motor", "temperature", "firmware"],
    links: [
      {
        title: "Guide for Analog Signal Clipping at ADC Input",
        url: "https://docs.industrial.support/solution/sol-27/guide",
      },
      {
        title: "FAQ for Analog Signal Clipping at ADC Input",
        url: "https://docs.internal/faq/sol-27",
      },
    ],
    documents: [
      {
        name: "Analog Signal Clipping at ADC Input Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Analog Signal Clipping at ADC Input Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T05:30:00Z",
  },
  {
    id: "SOL-028",
    title: "Inverter Module Communication Timeout",
    description:
      "Technician-confirmed steps to troubleshoot the issue: inverter module communication timeout.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.92,
    usageCount: 20,
    lastUsed: "2 hours ago",
    tags: ["temperature", "alarm", "controller"],
    links: [
      {
        title: "Guide for Inverter Module Communication Timeout",
        url: "https://docs.industrial.support/solution/sol-28/guide",
      },
      {
        title: "FAQ for Inverter Module Communication Timeout",
        url: "https://docs.internal/faq/sol-28",
      },
    ],
    documents: [
      {
        name: "Inverter Module Communication Timeout Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inverter Module Communication Timeout Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T05:15:00Z",
  },
  {
    id: "SOL-029",
    title: "Sudden Drop in Production Line Speed",
    description:
      "Technician-confirmed steps to troubleshoot the issue: sudden drop in production line speed.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.93,
    usageCount: 18,
    lastUsed: "10 hours ago",
    tags: ["vibration", "alarm", "calibration"],
    links: [
      {
        title: "Guide for Sudden Drop in Production Line Speed",
        url: "https://docs.industrial.support/solution/sol-29/guide",
      },
      {
        title: "FAQ for Sudden Drop in Production Line Speed",
        url: "https://docs.internal/faq/sol-29",
      },
    ],
    documents: [
      {
        name: "Sudden Drop in Production Line Speed Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Sudden Drop in Production Line Speed Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T05:00:00Z",
  },
  {
    id: "SOL-030",
    title: "PID Loop Oscillations in Temperature Control",
    description:
      "Technician-confirmed steps to troubleshoot the issue: pid loop oscillations in temperature control.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.82,
    usageCount: 7,
    lastUsed: "4 hours ago",
    tags: ["sensor", "hydraulic", "plc"],
    links: [
      {
        title: "Guide for PID Loop Oscillations in Temperature Control",
        url: "https://docs.industrial.support/solution/sol-30/guide",
      },
      {
        title: "FAQ for PID Loop Oscillations in Temperature Control",
        url: "https://docs.internal/faq/sol-30",
      },
    ],
    documents: [
      {
        name: "PID Loop Oscillations in Temperature Control Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PID Loop Oscillations in Temperature Control Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T04:45:00Z",
  },
  {
    id: "SOL-031",
    title: "Stepper Motor Stalling at High Speeds",
    description:
      "Technician-confirmed steps to troubleshoot the issue: stepper motor stalling at high speeds.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.91,
    usageCount: 18,
    lastUsed: "2 hours ago",
    tags: ["pressure", "relay", "sensor"],
    links: [
      {
        title: "Guide for Stepper Motor Stalling at High Speeds",
        url: "https://docs.industrial.support/solution/sol-31/guide",
      },
      {
        title: "FAQ for Stepper Motor Stalling at High Speeds",
        url: "https://docs.internal/faq/sol-31",
      },
    ],
    documents: [
      {
        name: "Stepper Motor Stalling at High Speeds Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Stepper Motor Stalling at High Speeds Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T04:30:00Z",
  },
  {
    id: "SOL-032",
    title: "Inconsistent Temperature Sensor Output",
    description:
      "Technician-confirmed steps to troubleshoot the issue: inconsistent temperature sensor output.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.79,
    usageCount: 20,
    lastUsed: "2 hours ago",
    tags: ["relay", "network", "hydraulic"],
    links: [
      {
        title: "Guide for Inconsistent Temperature Sensor Output",
        url: "https://docs.industrial.support/solution/sol-32/guide",
      },
      {
        title: "FAQ for Inconsistent Temperature Sensor Output",
        url: "https://docs.internal/faq/sol-32",
      },
    ],
    documents: [
      {
        name: "Inconsistent Temperature Sensor Output Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inconsistent Temperature Sensor Output Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T04:15:00Z",
  },
  {
    id: "SOL-033",
    title: "Hydraulic Pump Fails to Start",
    description:
      "Technician-confirmed steps to troubleshoot the issue: hydraulic pump fails to start.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.94,
    usageCount: 17,
    lastUsed: "3 hours ago",
    tags: ["plc", "calibration", "hydraulic"],
    links: [
      {
        title: "Guide for Hydraulic Pump Fails to Start",
        url: "https://docs.industrial.support/solution/sol-33/guide",
      },
      {
        title: "FAQ for Hydraulic Pump Fails to Start",
        url: "https://docs.internal/faq/sol-33",
      },
    ],
    documents: [
      {
        name: "Hydraulic Pump Fails to Start Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Hydraulic Pump Fails to Start Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T04:00:00Z",
  },
  {
    id: "SOL-034",
    title: "Vibration Levels Exceeding Threshold",
    description:
      "Technician-confirmed steps to troubleshoot the issue: vibration levels exceeding threshold.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.92,
    usageCount: 24,
    lastUsed: "10 hours ago",
    tags: ["vibration", "plc", "motor"],
    links: [
      {
        title: "Guide for Vibration Levels Exceeding Threshold",
        url: "https://docs.industrial.support/solution/sol-34/guide",
      },
      {
        title: "FAQ for Vibration Levels Exceeding Threshold",
        url: "https://docs.internal/faq/sol-34",
      },
    ],
    documents: [
      {
        name: "Vibration Levels Exceeding Threshold Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Vibration Levels Exceeding Threshold Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T03:45:00Z",
  },
  {
    id: "SOL-035",
    title: "PLC Not Recognizing Input Module",
    description:
      "Technician-confirmed steps to troubleshoot the issue: plc not recognizing input module.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.88,
    usageCount: 19,
    lastUsed: "6 hours ago",
    tags: ["hydraulic", "communication", "sensor"],
    links: [
      {
        title: "Guide for PLC Not Recognizing Input Module",
        url: "https://docs.industrial.support/solution/sol-35/guide",
      },
      {
        title: "FAQ for PLC Not Recognizing Input Module",
        url: "https://docs.internal/faq/sol-35",
      },
    ],
    documents: [
      {
        name: "PLC Not Recognizing Input Module Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PLC Not Recognizing Input Module Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T03:30:00Z",
  },
  {
    id: "SOL-036",
    title: "Slow Network Response from Control System",
    description:
      "Technician-confirmed steps to troubleshoot the issue: slow network response from control system.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.93,
    usageCount: 14,
    lastUsed: "3 hours ago",
    tags: ["communication", "plc", "controller"],
    links: [
      {
        title: "Guide for Slow Network Response from Control System",
        url: "https://docs.industrial.support/solution/sol-36/guide",
      },
      {
        title: "FAQ for Slow Network Response from Control System",
        url: "https://docs.internal/faq/sol-36",
      },
    ],
    documents: [
      {
        name: "Slow Network Response from Control System Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Slow Network Response from Control System Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T03:15:00Z",
  },
  {
    id: "SOL-037",
    title: "Unexpected Alarm on Cooling Fan",
    description:
      "Technician-confirmed steps to troubleshoot the issue: unexpected alarm on cooling fan.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.93,
    usageCount: 10,
    lastUsed: "10 hours ago",
    tags: ["plc", "motor", "relay"],
    links: [
      {
        title: "Guide for Unexpected Alarm on Cooling Fan",
        url: "https://docs.industrial.support/solution/sol-37/guide",
      },
      {
        title: "FAQ for Unexpected Alarm on Cooling Fan",
        url: "https://docs.internal/faq/sol-37",
      },
    ],
    documents: [
      {
        name: "Unexpected Alarm on Cooling Fan Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Unexpected Alarm on Cooling Fan Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T03:00:00Z",
  },
  {
    id: "SOL-038",
    title: "Pressure Valve Misreporting Readings",
    description:
      "Technician-confirmed steps to troubleshoot the issue: pressure valve misreporting readings.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.79,
    usageCount: 22,
    lastUsed: "4 hours ago",
    tags: ["calibration", "temperature", "sensor"],
    links: [
      {
        title: "Guide for Pressure Valve Misreporting Readings",
        url: "https://docs.industrial.support/solution/sol-38/guide",
      },
      {
        title: "FAQ for Pressure Valve Misreporting Readings",
        url: "https://docs.internal/faq/sol-38",
      },
    ],
    documents: [
      {
        name: "Pressure Valve Misreporting Readings Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Pressure Valve Misreporting Readings Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T02:45:00Z",
  },
  {
    id: "SOL-039",
    title: "Firmware Update Failure on Controller",
    description:
      "Technician-confirmed steps to troubleshoot the issue: firmware update failure on controller.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.86,
    usageCount: 11,
    lastUsed: "2 hours ago",
    tags: ["controller", "hydraulic", "motor"],
    links: [
      {
        title: "Guide for Firmware Update Failure on Controller",
        url: "https://docs.industrial.support/solution/sol-39/guide",
      },
      {
        title: "FAQ for Firmware Update Failure on Controller",
        url: "https://docs.internal/faq/sol-39",
      },
    ],
    documents: [
      {
        name: "Firmware Update Failure on Controller Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Firmware Update Failure on Controller Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T02:30:00Z",
  },
  {
    id: "SOL-040",
    title: "Relay Module Not Engaging",
    description: "Technician-confirmed steps to troubleshoot the issue: relay module not engaging.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.94,
    usageCount: 19,
    lastUsed: "2 hours ago",
    tags: ["motor", "firmware", "plc"],
    links: [
      {
        title: "Guide for Relay Module Not Engaging",
        url: "https://docs.industrial.support/solution/sol-40/guide",
      },
      {
        title: "FAQ for Relay Module Not Engaging",
        url: "https://docs.internal/faq/sol-40",
      },
    ],
    documents: [
      {
        name: "Relay Module Not Engaging Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Relay Module Not Engaging Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T02:15:00Z",
  },
  {
    id: "SOL-041",
    title: "Overvoltage Detected in Control Cabinet",
    description:
      "Technician-confirmed steps to troubleshoot the issue: overvoltage detected in control cabinet.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.83,
    usageCount: 23,
    lastUsed: "2 hours ago",
    tags: ["alarm", "sensor", "plc"],
    links: [
      {
        title: "Guide for Overvoltage Detected in Control Cabinet",
        url: "https://docs.industrial.support/solution/sol-41/guide",
      },
      {
        title: "FAQ for Overvoltage Detected in Control Cabinet",
        url: "https://docs.internal/faq/sol-41",
      },
    ],
    documents: [
      {
        name: "Overvoltage Detected in Control Cabinet Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Overvoltage Detected in Control Cabinet Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T02:00:00Z",
  },
  {
    id: "SOL-042",
    title: "Analog Signal Clipping at ADC Input",
    description:
      "Technician-confirmed steps to troubleshoot the issue: analog signal clipping at adc input.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.88,
    usageCount: 10,
    lastUsed: "9 hours ago",
    tags: ["pressure", "temperature", "network"],
    links: [
      {
        title: "Guide for Analog Signal Clipping at ADC Input",
        url: "https://docs.industrial.support/solution/sol-42/guide",
      },
      {
        title: "FAQ for Analog Signal Clipping at ADC Input",
        url: "https://docs.internal/faq/sol-42",
      },
    ],
    documents: [
      {
        name: "Analog Signal Clipping at ADC Input Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Analog Signal Clipping at ADC Input Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T01:45:00Z",
  },
  {
    id: "SOL-043",
    title: "Inverter Module Communication Timeout",
    description:
      "Technician-confirmed steps to troubleshoot the issue: inverter module communication timeout.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.9,
    usageCount: 15,
    lastUsed: "7 hours ago",
    tags: ["firmware", "calibration", "controller"],
    links: [
      {
        title: "Guide for Inverter Module Communication Timeout",
        url: "https://docs.industrial.support/solution/sol-43/guide",
      },
      {
        title: "FAQ for Inverter Module Communication Timeout",
        url: "https://docs.internal/faq/sol-43",
      },
    ],
    documents: [
      {
        name: "Inverter Module Communication Timeout Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inverter Module Communication Timeout Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T01:30:00Z",
  },
  {
    id: "SOL-044",
    title: "Sudden Drop in Production Line Speed",
    description:
      "Technician-confirmed steps to troubleshoot the issue: sudden drop in production line speed.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.91,
    usageCount: 22,
    lastUsed: "6 hours ago",
    tags: ["motor", "network", "temperature"],
    links: [
      {
        title: "Guide for Sudden Drop in Production Line Speed",
        url: "https://docs.industrial.support/solution/sol-44/guide",
      },
      {
        title: "FAQ for Sudden Drop in Production Line Speed",
        url: "https://docs.internal/faq/sol-44",
      },
    ],
    documents: [
      {
        name: "Sudden Drop in Production Line Speed Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Sudden Drop in Production Line Speed Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T01:15:00Z",
  },
  {
    id: "SOL-045",
    title: "PID Loop Oscillations in Temperature Control",
    description:
      "Technician-confirmed steps to troubleshoot the issue: pid loop oscillations in temperature control.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.95,
    usageCount: 7,
    lastUsed: "1 hours ago",
    tags: ["controller", "relay", "pressure"],
    links: [
      {
        title: "Guide for PID Loop Oscillations in Temperature Control",
        url: "https://docs.industrial.support/solution/sol-45/guide",
      },
      {
        title: "FAQ for PID Loop Oscillations in Temperature Control",
        url: "https://docs.internal/faq/sol-45",
      },
    ],
    documents: [
      {
        name: "PID Loop Oscillations in Temperature Control Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PID Loop Oscillations in Temperature Control Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T01:00:00Z",
  },
  {
    id: "SOL-046",
    title: "Stepper Motor Stalling at High Speeds",
    description:
      "Technician-confirmed steps to troubleshoot the issue: stepper motor stalling at high speeds.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.82,
    usageCount: 21,
    lastUsed: "8 hours ago",
    tags: ["firmware", "pressure", "motor"],
    links: [
      {
        title: "Guide for Stepper Motor Stalling at High Speeds",
        url: "https://docs.industrial.support/solution/sol-46/guide",
      },
      {
        title: "FAQ for Stepper Motor Stalling at High Speeds",
        url: "https://docs.internal/faq/sol-46",
      },
    ],
    documents: [
      {
        name: "Stepper Motor Stalling at High Speeds Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Stepper Motor Stalling at High Speeds Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T00:45:00Z",
  },
  {
    id: "SOL-047",
    title: "Inconsistent Temperature Sensor Output",
    description:
      "Technician-confirmed steps to troubleshoot the issue: inconsistent temperature sensor output.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.96,
    usageCount: 15,
    lastUsed: "7 hours ago",
    tags: ["network", "pressure", "hydraulic"],
    links: [
      {
        title: "Guide for Inconsistent Temperature Sensor Output",
        url: "https://docs.industrial.support/solution/sol-47/guide",
      },
      {
        title: "FAQ for Inconsistent Temperature Sensor Output",
        url: "https://docs.internal/faq/sol-47",
      },
    ],
    documents: [
      {
        name: "Inconsistent Temperature Sensor Output Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inconsistent Temperature Sensor Output Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T00:30:00Z",
  },
  {
    id: "SOL-048",
    title: "Hydraulic Pump Fails to Start",
    description:
      "Technician-confirmed steps to troubleshoot the issue: hydraulic pump fails to start.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.9,
    usageCount: 5,
    lastUsed: "5 hours ago",
    tags: ["alarm", "pressure", "sensor"],
    links: [
      {
        title: "Guide for Hydraulic Pump Fails to Start",
        url: "https://docs.industrial.support/solution/sol-48/guide",
      },
      {
        title: "FAQ for Hydraulic Pump Fails to Start",
        url: "https://docs.internal/faq/sol-48",
      },
    ],
    documents: [
      {
        name: "Hydraulic Pump Fails to Start Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Hydraulic Pump Fails to Start Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T00:15:00Z",
  },
  {
    id: "SOL-049",
    title: "Vibration Levels Exceeding Threshold",
    description:
      "Technician-confirmed steps to troubleshoot the issue: vibration levels exceeding threshold.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.84,
    usageCount: 19,
    lastUsed: "7 hours ago",
    tags: ["plc", "relay", "controller"],
    links: [
      {
        title: "Guide for Vibration Levels Exceeding Threshold",
        url: "https://docs.industrial.support/solution/sol-49/guide",
      },
      {
        title: "FAQ for Vibration Levels Exceeding Threshold",
        url: "https://docs.internal/faq/sol-49",
      },
    ],
    documents: [
      {
        name: "Vibration Levels Exceeding Threshold Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Vibration Levels Exceeding Threshold Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T00:00:00Z",
  },
  {
    id: "SOL-050",
    title: "PLC Not Recognizing Input Module",
    description:
      "Technician-confirmed steps to troubleshoot the issue: plc not recognizing input module.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.95,
    usageCount: 16,
    lastUsed: "3 hours ago",
    tags: ["temperature", "hydraulic", "plc"],
    links: [
      {
        title: "Guide for PLC Not Recognizing Input Module",
        url: "https://docs.industrial.support/solution/sol-50/guide",
      },
      {
        title: "FAQ for PLC Not Recognizing Input Module",
        url: "https://docs.internal/faq/sol-50",
      },
    ],
    documents: [
      {
        name: "PLC Not Recognizing Input Module Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PLC Not Recognizing Input Module Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T23:45:00Z",
  },
  {
    id: "SOL-051",
    title: "Slow Network Response from Control System",
    description:
      "Technician-confirmed steps to troubleshoot the issue: slow network response from control system.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.89,
    usageCount: 9,
    lastUsed: "5 hours ago",
    tags: ["temperature", "alarm", "sensor"],
    links: [
      {
        title: "Guide for Slow Network Response from Control System",
        url: "https://docs.industrial.support/solution/sol-51/guide",
      },
      {
        title: "FAQ for Slow Network Response from Control System",
        url: "https://docs.internal/faq/sol-51",
      },
    ],
    documents: [
      {
        name: "Slow Network Response from Control System Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Slow Network Response from Control System Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T23:30:00Z",
  },
  {
    id: "SOL-052",
    title: "Unexpected Alarm on Cooling Fan",
    description:
      "Technician-confirmed steps to troubleshoot the issue: unexpected alarm on cooling fan.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.87,
    usageCount: 11,
    lastUsed: "3 hours ago",
    tags: ["pressure", "network", "calibration"],
    links: [
      {
        title: "Guide for Unexpected Alarm on Cooling Fan",
        url: "https://docs.industrial.support/solution/sol-52/guide",
      },
      {
        title: "FAQ for Unexpected Alarm on Cooling Fan",
        url: "https://docs.internal/faq/sol-52",
      },
    ],
    documents: [
      {
        name: "Unexpected Alarm on Cooling Fan Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Unexpected Alarm on Cooling Fan Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T23:15:00Z",
  },
  {
    id: "SOL-053",
    title: "Pressure Valve Misreporting Readings",
    description:
      "Technician-confirmed steps to troubleshoot the issue: pressure valve misreporting readings.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.81,
    usageCount: 9,
    lastUsed: "5 hours ago",
    tags: ["alarm", "network", "sensor"],
    links: [
      {
        title: "Guide for Pressure Valve Misreporting Readings",
        url: "https://docs.industrial.support/solution/sol-53/guide",
      },
      {
        title: "FAQ for Pressure Valve Misreporting Readings",
        url: "https://docs.internal/faq/sol-53",
      },
    ],
    documents: [
      {
        name: "Pressure Valve Misreporting Readings Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Pressure Valve Misreporting Readings Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T23:00:00Z",
  },
  {
    id: "SOL-054",
    title: "Firmware Update Failure on Controller",
    description:
      "Technician-confirmed steps to troubleshoot the issue: firmware update failure on controller.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.89,
    usageCount: 13,
    lastUsed: "8 hours ago",
    tags: ["calibration", "sensor", "vibration"],
    links: [
      {
        title: "Guide for Firmware Update Failure on Controller",
        url: "https://docs.industrial.support/solution/sol-54/guide",
      },
      {
        title: "FAQ for Firmware Update Failure on Controller",
        url: "https://docs.internal/faq/sol-54",
      },
    ],
    documents: [
      {
        name: "Firmware Update Failure on Controller Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Firmware Update Failure on Controller Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T22:45:00Z",
  },
  {
    id: "SOL-055",
    title: "Relay Module Not Engaging",
    description: "Technician-confirmed steps to troubleshoot the issue: relay module not engaging.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.85,
    usageCount: 5,
    lastUsed: "2 hours ago",
    tags: ["communication", "calibration", "firmware"],
    links: [
      {
        title: "Guide for Relay Module Not Engaging",
        url: "https://docs.industrial.support/solution/sol-55/guide",
      },
      {
        title: "FAQ for Relay Module Not Engaging",
        url: "https://docs.internal/faq/sol-55",
      },
    ],
    documents: [
      {
        name: "Relay Module Not Engaging Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Relay Module Not Engaging Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T22:30:00Z",
  },
  {
    id: "SOL-056",
    title: "Overvoltage Detected in Control Cabinet",
    description:
      "Technician-confirmed steps to troubleshoot the issue: overvoltage detected in control cabinet.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.78,
    usageCount: 7,
    lastUsed: "5 hours ago",
    tags: ["sensor", "motor", "plc"],
    links: [
      {
        title: "Guide for Overvoltage Detected in Control Cabinet",
        url: "https://docs.industrial.support/solution/sol-56/guide",
      },
      {
        title: "FAQ for Overvoltage Detected in Control Cabinet",
        url: "https://docs.internal/faq/sol-56",
      },
    ],
    documents: [
      {
        name: "Overvoltage Detected in Control Cabinet Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Overvoltage Detected in Control Cabinet Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T22:15:00Z",
  },
  {
    id: "SOL-057",
    title: "Analog Signal Clipping at ADC Input",
    description:
      "Technician-confirmed steps to troubleshoot the issue: analog signal clipping at adc input.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.88,
    usageCount: 10,
    lastUsed: "2 hours ago",
    tags: ["relay", "hydraulic", "controller"],
    links: [
      {
        title: "Guide for Analog Signal Clipping at ADC Input",
        url: "https://docs.industrial.support/solution/sol-57/guide",
      },
      {
        title: "FAQ for Analog Signal Clipping at ADC Input",
        url: "https://docs.internal/faq/sol-57",
      },
    ],
    documents: [
      {
        name: "Analog Signal Clipping at ADC Input Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Analog Signal Clipping at ADC Input Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T22:00:00Z",
  },
  {
    id: "SOL-058",
    title: "Inverter Module Communication Timeout",
    description:
      "Technician-confirmed steps to troubleshoot the issue: inverter module communication timeout.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.82,
    usageCount: 25,
    lastUsed: "3 hours ago",
    tags: ["pressure", "calibration", "hydraulic"],
    links: [
      {
        title: "Guide for Inverter Module Communication Timeout",
        url: "https://docs.industrial.support/solution/sol-58/guide",
      },
      {
        title: "FAQ for Inverter Module Communication Timeout",
        url: "https://docs.internal/faq/sol-58",
      },
    ],
    documents: [
      {
        name: "Inverter Module Communication Timeout Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inverter Module Communication Timeout Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T21:45:00Z",
  },
  {
    id: "SOL-059",
    title: "Sudden Drop in Production Line Speed",
    description:
      "Technician-confirmed steps to troubleshoot the issue: sudden drop in production line speed.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.94,
    usageCount: 16,
    lastUsed: "1 hours ago",
    tags: ["communication", "temperature", "calibration"],
    links: [
      {
        title: "Guide for Sudden Drop in Production Line Speed",
        url: "https://docs.industrial.support/solution/sol-59/guide",
      },
      {
        title: "FAQ for Sudden Drop in Production Line Speed",
        url: "https://docs.internal/faq/sol-59",
      },
    ],
    documents: [
      {
        name: "Sudden Drop in Production Line Speed Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Sudden Drop in Production Line Speed Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T21:30:00Z",
  },
  {
    id: "SOL-060",
    title: "PID Loop Oscillations in Temperature Control",
    description:
      "Technician-confirmed steps to troubleshoot the issue: pid loop oscillations in temperature control.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.91,
    usageCount: 21,
    lastUsed: "6 hours ago",
    tags: ["plc", "motor", "sensor"],
    links: [
      {
        title: "Guide for PID Loop Oscillations in Temperature Control",
        url: "https://docs.industrial.support/solution/sol-60/guide",
      },
      {
        title: "FAQ for PID Loop Oscillations in Temperature Control",
        url: "https://docs.internal/faq/sol-60",
      },
    ],
    documents: [
      {
        name: "PID Loop Oscillations in Temperature Control Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PID Loop Oscillations in Temperature Control Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T21:15:00Z",
  },
  {
    id: "SOL-061",
    title: "Stepper Motor Stalling at High Speeds",
    description:
      "Technician-confirmed steps to troubleshoot the issue: stepper motor stalling at high speeds.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.79,
    usageCount: 4,
    lastUsed: "3 hours ago",
    tags: ["vibration", "alarm", "firmware"],
    links: [
      {
        title: "Guide for Stepper Motor Stalling at High Speeds",
        url: "https://docs.industrial.support/solution/sol-61/guide",
      },
      {
        title: "FAQ for Stepper Motor Stalling at High Speeds",
        url: "https://docs.internal/faq/sol-61",
      },
    ],
    documents: [
      {
        name: "Stepper Motor Stalling at High Speeds Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Stepper Motor Stalling at High Speeds Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T21:00:00Z",
  },
  {
    id: "SOL-062",
    title: "Inconsistent Temperature Sensor Output",
    description:
      "Technician-confirmed steps to troubleshoot the issue: inconsistent temperature sensor output.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.89,
    usageCount: 17,
    lastUsed: "2 hours ago",
    tags: ["pressure", "motor", "sensor"],
    links: [
      {
        title: "Guide for Inconsistent Temperature Sensor Output",
        url: "https://docs.industrial.support/solution/sol-62/guide",
      },
      {
        title: "FAQ for Inconsistent Temperature Sensor Output",
        url: "https://docs.internal/faq/sol-62",
      },
    ],
    documents: [
      {
        name: "Inconsistent Temperature Sensor Output Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inconsistent Temperature Sensor Output Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T20:45:00Z",
  },
  {
    id: "SOL-063",
    title: "Hydraulic Pump Fails to Start",
    description:
      "Technician-confirmed steps to troubleshoot the issue: hydraulic pump fails to start.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.93,
    usageCount: 13,
    lastUsed: "10 hours ago",
    tags: ["network", "firmware", "hydraulic"],
    links: [
      {
        title: "Guide for Hydraulic Pump Fails to Start",
        url: "https://docs.industrial.support/solution/sol-63/guide",
      },
      {
        title: "FAQ for Hydraulic Pump Fails to Start",
        url: "https://docs.internal/faq/sol-63",
      },
    ],
    documents: [
      {
        name: "Hydraulic Pump Fails to Start Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Hydraulic Pump Fails to Start Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T20:30:00Z",
  },
  {
    id: "SOL-064",
    title: "Vibration Levels Exceeding Threshold",
    description:
      "Technician-confirmed steps to troubleshoot the issue: vibration levels exceeding threshold.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.87,
    usageCount: 19,
    lastUsed: "3 hours ago",
    tags: ["hydraulic", "temperature", "network"],
    links: [
      {
        title: "Guide for Vibration Levels Exceeding Threshold",
        url: "https://docs.industrial.support/solution/sol-64/guide",
      },
      {
        title: "FAQ for Vibration Levels Exceeding Threshold",
        url: "https://docs.internal/faq/sol-64",
      },
    ],
    documents: [
      {
        name: "Vibration Levels Exceeding Threshold Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Vibration Levels Exceeding Threshold Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T20:15:00Z",
  },
  {
    id: "SOL-065",
    title: "PLC Not Recognizing Input Module",
    description:
      "Technician-confirmed steps to troubleshoot the issue: plc not recognizing input module.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.79,
    usageCount: 11,
    lastUsed: "5 hours ago",
    tags: ["sensor", "controller", "motor"],
    links: [
      {
        title: "Guide for PLC Not Recognizing Input Module",
        url: "https://docs.industrial.support/solution/sol-65/guide",
      },
      {
        title: "FAQ for PLC Not Recognizing Input Module",
        url: "https://docs.internal/faq/sol-65",
      },
    ],
    documents: [
      {
        name: "PLC Not Recognizing Input Module Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PLC Not Recognizing Input Module Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T20:00:00Z",
  },
  {
    id: "SOL-066",
    title: "Slow Network Response from Control System",
    description:
      "Technician-confirmed steps to troubleshoot the issue: slow network response from control system.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.97,
    usageCount: 16,
    lastUsed: "10 hours ago",
    tags: ["alarm", "communication", "plc"],
    links: [
      {
        title: "Guide for Slow Network Response from Control System",
        url: "https://docs.industrial.support/solution/sol-66/guide",
      },
      {
        title: "FAQ for Slow Network Response from Control System",
        url: "https://docs.internal/faq/sol-66",
      },
    ],
    documents: [
      {
        name: "Slow Network Response from Control System Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Slow Network Response from Control System Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T19:45:00Z",
  },
  {
    id: "SOL-067",
    title: "Unexpected Alarm on Cooling Fan",
    description:
      "Technician-confirmed steps to troubleshoot the issue: unexpected alarm on cooling fan.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.96,
    usageCount: 12,
    lastUsed: "3 hours ago",
    tags: ["hydraulic", "vibration", "sensor"],
    links: [
      {
        title: "Guide for Unexpected Alarm on Cooling Fan",
        url: "https://docs.industrial.support/solution/sol-67/guide",
      },
      {
        title: "FAQ for Unexpected Alarm on Cooling Fan",
        url: "https://docs.internal/faq/sol-67",
      },
    ],
    documents: [
      {
        name: "Unexpected Alarm on Cooling Fan Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Unexpected Alarm on Cooling Fan Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T19:30:00Z",
  },
  {
    id: "SOL-068",
    title: "Pressure Valve Misreporting Readings",
    description:
      "Technician-confirmed steps to troubleshoot the issue: pressure valve misreporting readings.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.93,
    usageCount: 16,
    lastUsed: "7 hours ago",
    tags: ["network", "pressure", "relay"],
    links: [
      {
        title: "Guide for Pressure Valve Misreporting Readings",
        url: "https://docs.industrial.support/solution/sol-68/guide",
      },
      {
        title: "FAQ for Pressure Valve Misreporting Readings",
        url: "https://docs.internal/faq/sol-68",
      },
    ],
    documents: [
      {
        name: "Pressure Valve Misreporting Readings Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Pressure Valve Misreporting Readings Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T19:15:00Z",
  },
  {
    id: "SOL-069",
    title: "Firmware Update Failure on Controller",
    description:
      "Technician-confirmed steps to troubleshoot the issue: firmware update failure on controller.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.97,
    usageCount: 8,
    lastUsed: "8 hours ago",
    tags: ["network", "temperature", "controller"],
    links: [
      {
        title: "Guide for Firmware Update Failure on Controller",
        url: "https://docs.industrial.support/solution/sol-69/guide",
      },
      {
        title: "FAQ for Firmware Update Failure on Controller",
        url: "https://docs.internal/faq/sol-69",
      },
    ],
    documents: [
      {
        name: "Firmware Update Failure on Controller Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Firmware Update Failure on Controller Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T19:00:00Z",
  },
  {
    id: "SOL-070",
    title: "Relay Module Not Engaging",
    description: "Technician-confirmed steps to troubleshoot the issue: relay module not engaging.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.83,
    usageCount: 12,
    lastUsed: "6 hours ago",
    tags: ["firmware", "motor", "alarm"],
    links: [
      {
        title: "Guide for Relay Module Not Engaging",
        url: "https://docs.industrial.support/solution/sol-70/guide",
      },
      {
        title: "FAQ for Relay Module Not Engaging",
        url: "https://docs.internal/faq/sol-70",
      },
    ],
    documents: [
      {
        name: "Relay Module Not Engaging Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Relay Module Not Engaging Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T18:45:00Z",
  },
  {
    id: "SOL-071",
    title: "Overvoltage Detected in Control Cabinet",
    description:
      "Technician-confirmed steps to troubleshoot the issue: overvoltage detected in control cabinet.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.91,
    usageCount: 23,
    lastUsed: "2 hours ago",
    tags: ["communication", "plc", "network"],
    links: [
      {
        title: "Guide for Overvoltage Detected in Control Cabinet",
        url: "https://docs.industrial.support/solution/sol-71/guide",
      },
      {
        title: "FAQ for Overvoltage Detected in Control Cabinet",
        url: "https://docs.internal/faq/sol-71",
      },
    ],
    documents: [
      {
        name: "Overvoltage Detected in Control Cabinet Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Overvoltage Detected in Control Cabinet Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T18:30:00Z",
  },
  {
    id: "SOL-072",
    title: "Analog Signal Clipping at ADC Input",
    description:
      "Technician-confirmed steps to troubleshoot the issue: analog signal clipping at adc input.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.95,
    usageCount: 8,
    lastUsed: "1 hours ago",
    tags: ["calibration", "hydraulic", "relay"],
    links: [
      {
        title: "Guide for Analog Signal Clipping at ADC Input",
        url: "https://docs.industrial.support/solution/sol-72/guide",
      },
      {
        title: "FAQ for Analog Signal Clipping at ADC Input",
        url: "https://docs.internal/faq/sol-72",
      },
    ],
    documents: [
      {
        name: "Analog Signal Clipping at ADC Input Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Analog Signal Clipping at ADC Input Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T18:15:00Z",
  },
  {
    id: "SOL-073",
    title: "Inverter Module Communication Timeout",
    description:
      "Technician-confirmed steps to troubleshoot the issue: inverter module communication timeout.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.83,
    usageCount: 3,
    lastUsed: "2 hours ago",
    tags: ["motor", "communication", "calibration"],
    links: [
      {
        title: "Guide for Inverter Module Communication Timeout",
        url: "https://docs.industrial.support/solution/sol-73/guide",
      },
      {
        title: "FAQ for Inverter Module Communication Timeout",
        url: "https://docs.internal/faq/sol-73",
      },
    ],
    documents: [
      {
        name: "Inverter Module Communication Timeout Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inverter Module Communication Timeout Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T18:00:00Z",
  },
  {
    id: "SOL-074",
    title: "Sudden Drop in Production Line Speed",
    description:
      "Technician-confirmed steps to troubleshoot the issue: sudden drop in production line speed.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.87,
    usageCount: 20,
    lastUsed: "4 hours ago",
    tags: ["controller", "pressure", "calibration"],
    links: [
      {
        title: "Guide for Sudden Drop in Production Line Speed",
        url: "https://docs.industrial.support/solution/sol-74/guide",
      },
      {
        title: "FAQ for Sudden Drop in Production Line Speed",
        url: "https://docs.internal/faq/sol-74",
      },
    ],
    documents: [
      {
        name: "Sudden Drop in Production Line Speed Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Sudden Drop in Production Line Speed Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T17:45:00Z",
  },
  {
    id: "SOL-075",
    title: "PID Loop Oscillations in Temperature Control",
    description:
      "Technician-confirmed steps to troubleshoot the issue: pid loop oscillations in temperature control.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.87,
    usageCount: 14,
    lastUsed: "2 hours ago",
    tags: ["pressure", "relay", "vibration"],
    links: [
      {
        title: "Guide for PID Loop Oscillations in Temperature Control",
        url: "https://docs.industrial.support/solution/sol-75/guide",
      },
      {
        title: "FAQ for PID Loop Oscillations in Temperature Control",
        url: "https://docs.internal/faq/sol-75",
      },
    ],
    documents: [
      {
        name: "PID Loop Oscillations in Temperature Control Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PID Loop Oscillations in Temperature Control Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T17:30:00Z",
  },
  {
    id: "SOL-076",
    title: "Stepper Motor Stalling at High Speeds",
    description:
      "Technician-confirmed steps to troubleshoot the issue: stepper motor stalling at high speeds.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.81,
    usageCount: 20,
    lastUsed: "7 hours ago",
    tags: ["temperature", "pressure", "sensor"],
    links: [
      {
        title: "Guide for Stepper Motor Stalling at High Speeds",
        url: "https://docs.industrial.support/solution/sol-76/guide",
      },
      {
        title: "FAQ for Stepper Motor Stalling at High Speeds",
        url: "https://docs.internal/faq/sol-76",
      },
    ],
    documents: [
      {
        name: "Stepper Motor Stalling at High Speeds Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Stepper Motor Stalling at High Speeds Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T17:15:00Z",
  },
  {
    id: "SOL-077",
    title: "Inconsistent Temperature Sensor Output",
    description:
      "Technician-confirmed steps to troubleshoot the issue: inconsistent temperature sensor output.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.79,
    usageCount: 11,
    lastUsed: "7 hours ago",
    tags: ["alarm", "plc", "sensor"],
    links: [
      {
        title: "Guide for Inconsistent Temperature Sensor Output",
        url: "https://docs.industrial.support/solution/sol-77/guide",
      },
      {
        title: "FAQ for Inconsistent Temperature Sensor Output",
        url: "https://docs.internal/faq/sol-77",
      },
    ],
    documents: [
      {
        name: "Inconsistent Temperature Sensor Output Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inconsistent Temperature Sensor Output Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T17:00:00Z",
  },
  {
    id: "SOL-078",
    title: "Hydraulic Pump Fails to Start",
    description:
      "Technician-confirmed steps to troubleshoot the issue: hydraulic pump fails to start.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.8,
    usageCount: 14,
    lastUsed: "4 hours ago",
    tags: ["vibration", "pressure", "sensor"],
    links: [
      {
        title: "Guide for Hydraulic Pump Fails to Start",
        url: "https://docs.industrial.support/solution/sol-78/guide",
      },
      {
        title: "FAQ for Hydraulic Pump Fails to Start",
        url: "https://docs.internal/faq/sol-78",
      },
    ],
    documents: [
      {
        name: "Hydraulic Pump Fails to Start Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Hydraulic Pump Fails to Start Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T16:45:00Z",
  },
  {
    id: "SOL-079",
    title: "Vibration Levels Exceeding Threshold",
    description:
      "Technician-confirmed steps to troubleshoot the issue: vibration levels exceeding threshold.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.92,
    usageCount: 6,
    lastUsed: "4 hours ago",
    tags: ["relay", "pressure", "controller"],
    links: [
      {
        title: "Guide for Vibration Levels Exceeding Threshold",
        url: "https://docs.industrial.support/solution/sol-79/guide",
      },
      {
        title: "FAQ for Vibration Levels Exceeding Threshold",
        url: "https://docs.internal/faq/sol-79",
      },
    ],
    documents: [
      {
        name: "Vibration Levels Exceeding Threshold Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Vibration Levels Exceeding Threshold Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T16:30:00Z",
  },
  {
    id: "SOL-080",
    title: "PLC Not Recognizing Input Module",
    description:
      "Technician-confirmed steps to troubleshoot the issue: plc not recognizing input module.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.93,
    usageCount: 19,
    lastUsed: "6 hours ago",
    tags: ["plc", "temperature", "communication"],
    links: [
      {
        title: "Guide for PLC Not Recognizing Input Module",
        url: "https://docs.industrial.support/solution/sol-80/guide",
      },
      {
        title: "FAQ for PLC Not Recognizing Input Module",
        url: "https://docs.internal/faq/sol-80",
      },
    ],
    documents: [
      {
        name: "PLC Not Recognizing Input Module Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PLC Not Recognizing Input Module Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T16:15:00Z",
  },
  {
    id: "SOL-081",
    title: "Slow Network Response from Control System",
    description:
      "Technician-confirmed steps to troubleshoot the issue: slow network response from control system.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.83,
    usageCount: 22,
    lastUsed: "6 hours ago",
    tags: ["motor", "vibration", "calibration"],
    links: [
      {
        title: "Guide for Slow Network Response from Control System",
        url: "https://docs.industrial.support/solution/sol-81/guide",
      },
      {
        title: "FAQ for Slow Network Response from Control System",
        url: "https://docs.internal/faq/sol-81",
      },
    ],
    documents: [
      {
        name: "Slow Network Response from Control System Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Slow Network Response from Control System Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T16:00:00Z",
  },
  {
    id: "SOL-082",
    title: "Unexpected Alarm on Cooling Fan",
    description:
      "Technician-confirmed steps to troubleshoot the issue: unexpected alarm on cooling fan.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.95,
    usageCount: 8,
    lastUsed: "6 hours ago",
    tags: ["sensor", "hydraulic", "firmware"],
    links: [
      {
        title: "Guide for Unexpected Alarm on Cooling Fan",
        url: "https://docs.industrial.support/solution/sol-82/guide",
      },
      {
        title: "FAQ for Unexpected Alarm on Cooling Fan",
        url: "https://docs.internal/faq/sol-82",
      },
    ],
    documents: [
      {
        name: "Unexpected Alarm on Cooling Fan Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Unexpected Alarm on Cooling Fan Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T15:45:00Z",
  },
  {
    id: "SOL-083",
    title: "Pressure Valve Misreporting Readings",
    description:
      "Technician-confirmed steps to troubleshoot the issue: pressure valve misreporting readings.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.9,
    usageCount: 6,
    lastUsed: "3 hours ago",
    tags: ["temperature", "sensor", "vibration"],
    links: [
      {
        title: "Guide for Pressure Valve Misreporting Readings",
        url: "https://docs.industrial.support/solution/sol-83/guide",
      },
      {
        title: "FAQ for Pressure Valve Misreporting Readings",
        url: "https://docs.internal/faq/sol-83",
      },
    ],
    documents: [
      {
        name: "Pressure Valve Misreporting Readings Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Pressure Valve Misreporting Readings Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T15:30:00Z",
  },
  {
    id: "SOL-084",
    title: "Firmware Update Failure on Controller",
    description:
      "Technician-confirmed steps to troubleshoot the issue: firmware update failure on controller.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.78,
    usageCount: 6,
    lastUsed: "5 hours ago",
    tags: ["plc", "firmware", "alarm"],
    links: [
      {
        title: "Guide for Firmware Update Failure on Controller",
        url: "https://docs.industrial.support/solution/sol-84/guide",
      },
      {
        title: "FAQ for Firmware Update Failure on Controller",
        url: "https://docs.internal/faq/sol-84",
      },
    ],
    documents: [
      {
        name: "Firmware Update Failure on Controller Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Firmware Update Failure on Controller Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T15:15:00Z",
  },
  {
    id: "SOL-085",
    title: "Relay Module Not Engaging",
    description: "Technician-confirmed steps to troubleshoot the issue: relay module not engaging.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.94,
    usageCount: 8,
    lastUsed: "7 hours ago",
    tags: ["relay", "alarm", "firmware"],
    links: [
      {
        title: "Guide for Relay Module Not Engaging",
        url: "https://docs.industrial.support/solution/sol-85/guide",
      },
      {
        title: "FAQ for Relay Module Not Engaging",
        url: "https://docs.internal/faq/sol-85",
      },
    ],
    documents: [
      {
        name: "Relay Module Not Engaging Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Relay Module Not Engaging Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T15:00:00Z",
  },
  {
    id: "SOL-086",
    title: "Overvoltage Detected in Control Cabinet",
    description:
      "Technician-confirmed steps to troubleshoot the issue: overvoltage detected in control cabinet.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.86,
    usageCount: 6,
    lastUsed: "2 hours ago",
    tags: ["controller", "calibration", "firmware"],
    links: [
      {
        title: "Guide for Overvoltage Detected in Control Cabinet",
        url: "https://docs.industrial.support/solution/sol-86/guide",
      },
      {
        title: "FAQ for Overvoltage Detected in Control Cabinet",
        url: "https://docs.internal/faq/sol-86",
      },
    ],
    documents: [
      {
        name: "Overvoltage Detected in Control Cabinet Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Overvoltage Detected in Control Cabinet Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T14:45:00Z",
  },
  {
    id: "SOL-087",
    title: "Analog Signal Clipping at ADC Input",
    description:
      "Technician-confirmed steps to troubleshoot the issue: analog signal clipping at adc input.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.97,
    usageCount: 5,
    lastUsed: "4 hours ago",
    tags: ["calibration", "firmware", "controller"],
    links: [
      {
        title: "Guide for Analog Signal Clipping at ADC Input",
        url: "https://docs.industrial.support/solution/sol-87/guide",
      },
      {
        title: "FAQ for Analog Signal Clipping at ADC Input",
        url: "https://docs.internal/faq/sol-87",
      },
    ],
    documents: [
      {
        name: "Analog Signal Clipping at ADC Input Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Analog Signal Clipping at ADC Input Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T14:30:00Z",
  },
  {
    id: "SOL-088",
    title: "Inverter Module Communication Timeout",
    description:
      "Technician-confirmed steps to troubleshoot the issue: inverter module communication timeout.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.94,
    usageCount: 7,
    lastUsed: "8 hours ago",
    tags: ["motor", "plc", "pressure"],
    links: [
      {
        title: "Guide for Inverter Module Communication Timeout",
        url: "https://docs.industrial.support/solution/sol-88/guide",
      },
      {
        title: "FAQ for Inverter Module Communication Timeout",
        url: "https://docs.internal/faq/sol-88",
      },
    ],
    documents: [
      {
        name: "Inverter Module Communication Timeout Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inverter Module Communication Timeout Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T14:15:00Z",
  },
  {
    id: "SOL-089",
    title: "Sudden Drop in Production Line Speed",
    description:
      "Technician-confirmed steps to troubleshoot the issue: sudden drop in production line speed.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.92,
    usageCount: 10,
    lastUsed: "5 hours ago",
    tags: ["sensor", "vibration", "controller"],
    links: [
      {
        title: "Guide for Sudden Drop in Production Line Speed",
        url: "https://docs.industrial.support/solution/sol-89/guide",
      },
      {
        title: "FAQ for Sudden Drop in Production Line Speed",
        url: "https://docs.internal/faq/sol-89",
      },
    ],
    documents: [
      {
        name: "Sudden Drop in Production Line Speed Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Sudden Drop in Production Line Speed Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T14:00:00Z",
  },
  {
    id: "SOL-090",
    title: "PID Loop Oscillations in Temperature Control",
    description:
      "Technician-confirmed steps to troubleshoot the issue: pid loop oscillations in temperature control.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.82,
    usageCount: 14,
    lastUsed: "4 hours ago",
    tags: ["calibration", "hydraulic", "relay"],
    links: [
      {
        title: "Guide for PID Loop Oscillations in Temperature Control",
        url: "https://docs.industrial.support/solution/sol-90/guide",
      },
      {
        title: "FAQ for PID Loop Oscillations in Temperature Control",
        url: "https://docs.internal/faq/sol-90",
      },
    ],
    documents: [
      {
        name: "PID Loop Oscillations in Temperature Control Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PID Loop Oscillations in Temperature Control Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T13:45:00Z",
  },
  {
    id: "SOL-091",
    title: "Stepper Motor Stalling at High Speeds",
    description:
      "Technician-confirmed steps to troubleshoot the issue: stepper motor stalling at high speeds.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.89,
    usageCount: 9,
    lastUsed: "2 hours ago",
    tags: ["firmware", "motor", "plc"],
    links: [
      {
        title: "Guide for Stepper Motor Stalling at High Speeds",
        url: "https://docs.industrial.support/solution/sol-91/guide",
      },
      {
        title: "FAQ for Stepper Motor Stalling at High Speeds",
        url: "https://docs.internal/faq/sol-91",
      },
    ],
    documents: [
      {
        name: "Stepper Motor Stalling at High Speeds Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Stepper Motor Stalling at High Speeds Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T13:30:00Z",
  },
  {
    id: "SOL-092",
    title: "Inconsistent Temperature Sensor Output",
    description:
      "Technician-confirmed steps to troubleshoot the issue: inconsistent temperature sensor output.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.94,
    usageCount: 23,
    lastUsed: "9 hours ago",
    tags: ["relay", "calibration", "controller"],
    links: [
      {
        title: "Guide for Inconsistent Temperature Sensor Output",
        url: "https://docs.industrial.support/solution/sol-92/guide",
      },
      {
        title: "FAQ for Inconsistent Temperature Sensor Output",
        url: "https://docs.internal/faq/sol-92",
      },
    ],
    documents: [
      {
        name: "Inconsistent Temperature Sensor Output Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inconsistent Temperature Sensor Output Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T13:15:00Z",
  },
  {
    id: "SOL-093",
    title: "Hydraulic Pump Fails to Start",
    description:
      "Technician-confirmed steps to troubleshoot the issue: hydraulic pump fails to start.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.79,
    usageCount: 8,
    lastUsed: "10 hours ago",
    tags: ["motor", "plc", "controller"],
    links: [
      {
        title: "Guide for Hydraulic Pump Fails to Start",
        url: "https://docs.industrial.support/solution/sol-93/guide",
      },
      {
        title: "FAQ for Hydraulic Pump Fails to Start",
        url: "https://docs.internal/faq/sol-93",
      },
    ],
    documents: [
      {
        name: "Hydraulic Pump Fails to Start Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Hydraulic Pump Fails to Start Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T13:00:00Z",
  },
  {
    id: "SOL-094",
    title: "Vibration Levels Exceeding Threshold",
    description:
      "Technician-confirmed steps to troubleshoot the issue: vibration levels exceeding threshold.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.94,
    usageCount: 19,
    lastUsed: "7 hours ago",
    tags: ["firmware", "sensor", "temperature"],
    links: [
      {
        title: "Guide for Vibration Levels Exceeding Threshold",
        url: "https://docs.industrial.support/solution/sol-94/guide",
      },
      {
        title: "FAQ for Vibration Levels Exceeding Threshold",
        url: "https://docs.internal/faq/sol-94",
      },
    ],
    documents: [
      {
        name: "Vibration Levels Exceeding Threshold Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Vibration Levels Exceeding Threshold Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T12:45:00Z",
  },
  {
    id: "SOL-095",
    title: "PLC Not Recognizing Input Module",
    description:
      "Technician-confirmed steps to troubleshoot the issue: plc not recognizing input module.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.9,
    usageCount: 17,
    lastUsed: "8 hours ago",
    tags: ["firmware", "network", "alarm"],
    links: [
      {
        title: "Guide for PLC Not Recognizing Input Module",
        url: "https://docs.industrial.support/solution/sol-95/guide",
      },
      {
        title: "FAQ for PLC Not Recognizing Input Module",
        url: "https://docs.internal/faq/sol-95",
      },
    ],
    documents: [
      {
        name: "PLC Not Recognizing Input Module Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PLC Not Recognizing Input Module Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T12:30:00Z",
  },
  {
    id: "SOL-096",
    title: "Slow Network Response from Control System",
    description:
      "Technician-confirmed steps to troubleshoot the issue: slow network response from control system.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.86,
    usageCount: 5,
    lastUsed: "2 hours ago",
    tags: ["controller", "sensor", "calibration"],
    links: [
      {
        title: "Guide for Slow Network Response from Control System",
        url: "https://docs.industrial.support/solution/sol-96/guide",
      },
      {
        title: "FAQ for Slow Network Response from Control System",
        url: "https://docs.internal/faq/sol-96",
      },
    ],
    documents: [
      {
        name: "Slow Network Response from Control System Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Slow Network Response from Control System Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T12:15:00Z",
  },
  {
    id: "SOL-097",
    title: "Unexpected Alarm on Cooling Fan",
    description:
      "Technician-confirmed steps to troubleshoot the issue: unexpected alarm on cooling fan.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.94,
    usageCount: 10,
    lastUsed: "7 hours ago",
    tags: ["network", "sensor", "calibration"],
    links: [
      {
        title: "Guide for Unexpected Alarm on Cooling Fan",
        url: "https://docs.industrial.support/solution/sol-97/guide",
      },
      {
        title: "FAQ for Unexpected Alarm on Cooling Fan",
        url: "https://docs.internal/faq/sol-97",
      },
    ],
    documents: [
      {
        name: "Unexpected Alarm on Cooling Fan Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Unexpected Alarm on Cooling Fan Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T12:00:00Z",
  },
  {
    id: "SOL-098",
    title: "Pressure Valve Misreporting Readings",
    description:
      "Technician-confirmed steps to troubleshoot the issue: pressure valve misreporting readings.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: true,
    confidence: 0.89,
    usageCount: 10,
    lastUsed: "2 hours ago",
    tags: ["relay", "communication", "firmware"],
    links: [
      {
        title: "Guide for Pressure Valve Misreporting Readings",
        url: "https://docs.industrial.support/solution/sol-98/guide",
      },
      {
        title: "FAQ for Pressure Valve Misreporting Readings",
        url: "https://docs.internal/faq/sol-98",
      },
    ],
    documents: [
      {
        name: "Pressure Valve Misreporting Readings Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Pressure Valve Misreporting Readings Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T11:45:00Z",
  },
  {
    id: "SOL-099",
    title: "Firmware Update Failure on Controller",
    description:
      "Technician-confirmed steps to troubleshoot the issue: firmware update failure on controller.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: true,
    confidence: 0.88,
    usageCount: 22,
    lastUsed: "10 hours ago",
    tags: ["hydraulic", "temperature", "network"],
    links: [
      {
        title: "Guide for Firmware Update Failure on Controller",
        url: "https://docs.industrial.support/solution/sol-99/guide",
      },
      {
        title: "FAQ for Firmware Update Failure on Controller",
        url: "https://docs.internal/faq/sol-99",
      },
    ],
    documents: [
      {
        name: "Firmware Update Failure on Controller Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Firmware Update Failure on Controller Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T11:30:00Z",
  },
  {
    id: "SOL-100",
    title: "Relay Module Not Engaging",
    description: "Technician-confirmed steps to troubleshoot the issue: relay module not engaging.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: true,
    confidence: 0.92,
    usageCount: 25,
    lastUsed: "3 hours ago",
    tags: ["relay", "pressure", "vibration"],
    links: [
      {
        title: "Guide for Relay Module Not Engaging",
        url: "https://docs.industrial.support/solution/sol-100/guide",
      },
      {
        title: "FAQ for Relay Module Not Engaging",
        url: "https://docs.internal/faq/sol-100",
      },
    ],
    documents: [
      {
        name: "Relay Module Not Engaging Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Relay Module Not Engaging Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T11:15:00Z",
  },
];

export const aiSolutions: Solution[] = [
  {
    id: "AI-SOL-001",
    title: "Stepper Motor Stalling at High Speeds",
    description:
      "AI-generated steps to troubleshoot the issue: stepper motor stalling at high speeds.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.92,
    usageCount: 14,
    lastUsed: "3 hours ago",
    tags: ["alarm", "communication", "sensor"],
    links: [
      {
        title: "Guide for Stepper Motor Stalling at High Speeds",
        url: "https://docs.industrial.support/solution/ai-sol-1/guide",
      },
      {
        title: "FAQ for Stepper Motor Stalling at High Speeds",
        url: "https://docs.internal/faq/ai-sol-1",
      },
    ],
    documents: [
      {
        name: "Stepper Motor Stalling at High Speeds Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Stepper Motor Stalling at High Speeds Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T12:00:00Z",
  },
  {
    id: "AI-SOL-002",
    title: "Inconsistent Temperature Sensor Output",
    description:
      "AI-generated steps to troubleshoot the issue: inconsistent temperature sensor output.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.83,
    usageCount: 18,
    lastUsed: "7 hours ago",
    tags: ["vibration", "alarm", "calibration"],
    links: [
      {
        title: "Guide for Inconsistent Temperature Sensor Output",
        url: "https://docs.industrial.support/solution/ai-sol-2/guide",
      },
      {
        title: "FAQ for Inconsistent Temperature Sensor Output",
        url: "https://docs.internal/faq/ai-sol-2",
      },
    ],
    documents: [
      {
        name: "Inconsistent Temperature Sensor Output Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inconsistent Temperature Sensor Output Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T11:45:00Z",
  },
  {
    id: "AI-SOL-003",
    title: "Hydraulic Pump Fails to Start",
    description: "AI-generated steps to troubleshoot the issue: hydraulic pump fails to start.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.88,
    usageCount: 13,
    lastUsed: "3 hours ago",
    tags: ["firmware", "vibration", "controller"],
    links: [
      {
        title: "Guide for Hydraulic Pump Fails to Start",
        url: "https://docs.industrial.support/solution/ai-sol-3/guide",
      },
      {
        title: "FAQ for Hydraulic Pump Fails to Start",
        url: "https://docs.internal/faq/ai-sol-3",
      },
    ],
    documents: [
      {
        name: "Hydraulic Pump Fails to Start Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Hydraulic Pump Fails to Start Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T11:30:00Z",
  },
  {
    id: "AI-SOL-004",
    title: "Vibration Levels Exceeding Threshold",
    description:
      "AI-generated steps to troubleshoot the issue: vibration levels exceeding threshold.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.87,
    usageCount: 16,
    lastUsed: "9 hours ago",
    tags: ["vibration", "hydraulic", "sensor"],
    links: [
      {
        title: "Guide for Vibration Levels Exceeding Threshold",
        url: "https://docs.industrial.support/solution/ai-sol-4/guide",
      },
      {
        title: "FAQ for Vibration Levels Exceeding Threshold",
        url: "https://docs.internal/faq/ai-sol-4",
      },
    ],
    documents: [
      {
        name: "Vibration Levels Exceeding Threshold Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Vibration Levels Exceeding Threshold Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T11:15:00Z",
  },
  {
    id: "AI-SOL-005",
    title: "PLC Not Recognizing Input Module",
    description: "AI-generated steps to troubleshoot the issue: plc not recognizing input module.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.86,
    usageCount: 4,
    lastUsed: "4 hours ago",
    tags: ["relay", "temperature", "sensor"],
    links: [
      {
        title: "Guide for PLC Not Recognizing Input Module",
        url: "https://docs.industrial.support/solution/ai-sol-5/guide",
      },
      {
        title: "FAQ for PLC Not Recognizing Input Module",
        url: "https://docs.internal/faq/ai-sol-5",
      },
    ],
    documents: [
      {
        name: "PLC Not Recognizing Input Module Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PLC Not Recognizing Input Module Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T11:00:00Z",
  },
  {
    id: "AI-SOL-006",
    title: "Slow Network Response from Control System",
    description:
      "AI-generated steps to troubleshoot the issue: slow network response from control system.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.96,
    usageCount: 11,
    lastUsed: "8 hours ago",
    tags: ["hydraulic", "sensor", "plc"],
    links: [
      {
        title: "Guide for Slow Network Response from Control System",
        url: "https://docs.industrial.support/solution/ai-sol-6/guide",
      },
      {
        title: "FAQ for Slow Network Response from Control System",
        url: "https://docs.internal/faq/ai-sol-6",
      },
    ],
    documents: [
      {
        name: "Slow Network Response from Control System Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Slow Network Response from Control System Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T10:45:00Z",
  },
  {
    id: "AI-SOL-007",
    title: "Unexpected Alarm on Cooling Fan",
    description: "AI-generated steps to troubleshoot the issue: unexpected alarm on cooling fan.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.96,
    usageCount: 17,
    lastUsed: "8 hours ago",
    tags: ["plc", "pressure", "motor"],
    links: [
      {
        title: "Guide for Unexpected Alarm on Cooling Fan",
        url: "https://docs.industrial.support/solution/ai-sol-7/guide",
      },
      {
        title: "FAQ for Unexpected Alarm on Cooling Fan",
        url: "https://docs.internal/faq/ai-sol-7",
      },
    ],
    documents: [
      {
        name: "Unexpected Alarm on Cooling Fan Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Unexpected Alarm on Cooling Fan Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T10:30:00Z",
  },
  {
    id: "AI-SOL-008",
    title: "Pressure Valve Misreporting Readings",
    description:
      "AI-generated steps to troubleshoot the issue: pressure valve misreporting readings.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.89,
    usageCount: 18,
    lastUsed: "8 hours ago",
    tags: ["hydraulic", "firmware", "controller"],
    links: [
      {
        title: "Guide for Pressure Valve Misreporting Readings",
        url: "https://docs.industrial.support/solution/ai-sol-8/guide",
      },
      {
        title: "FAQ for Pressure Valve Misreporting Readings",
        url: "https://docs.internal/faq/ai-sol-8",
      },
    ],
    documents: [
      {
        name: "Pressure Valve Misreporting Readings Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Pressure Valve Misreporting Readings Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T10:15:00Z",
  },
  {
    id: "AI-SOL-009",
    title: "Firmware Update Failure on Controller",
    description:
      "AI-generated steps to troubleshoot the issue: firmware update failure on controller.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.84,
    usageCount: 24,
    lastUsed: "10 hours ago",
    tags: ["communication", "motor", "plc"],
    links: [
      {
        title: "Guide for Firmware Update Failure on Controller",
        url: "https://docs.industrial.support/solution/ai-sol-9/guide",
      },
      {
        title: "FAQ for Firmware Update Failure on Controller",
        url: "https://docs.internal/faq/ai-sol-9",
      },
    ],
    documents: [
      {
        name: "Firmware Update Failure on Controller Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Firmware Update Failure on Controller Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T10:00:00Z",
  },
  {
    id: "AI-SOL-010",
    title: "Relay Module Not Engaging",
    description: "AI-generated steps to troubleshoot the issue: relay module not engaging.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.9,
    usageCount: 7,
    lastUsed: "8 hours ago",
    tags: ["communication", "sensor", "calibration"],
    links: [
      {
        title: "Guide for Relay Module Not Engaging",
        url: "https://docs.industrial.support/solution/ai-sol-10/guide",
      },
      {
        title: "FAQ for Relay Module Not Engaging",
        url: "https://docs.internal/faq/ai-sol-10",
      },
    ],
    documents: [
      {
        name: "Relay Module Not Engaging Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Relay Module Not Engaging Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T09:45:00Z",
  },
  {
    id: "AI-SOL-011",
    title: "Overvoltage Detected in Control Cabinet",
    description:
      "AI-generated steps to troubleshoot the issue: overvoltage detected in control cabinet.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.89,
    usageCount: 3,
    lastUsed: "6 hours ago",
    tags: ["network", "temperature", "sensor"],
    links: [
      {
        title: "Guide for Overvoltage Detected in Control Cabinet",
        url: "https://docs.industrial.support/solution/ai-sol-11/guide",
      },
      {
        title: "FAQ for Overvoltage Detected in Control Cabinet",
        url: "https://docs.internal/faq/ai-sol-11",
      },
    ],
    documents: [
      {
        name: "Overvoltage Detected in Control Cabinet Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Overvoltage Detected in Control Cabinet Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T09:30:00Z",
  },
  {
    id: "AI-SOL-012",
    title: "Analog Signal Clipping at ADC Input",
    description:
      "AI-generated steps to troubleshoot the issue: analog signal clipping at adc input.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.79,
    usageCount: 3,
    lastUsed: "10 hours ago",
    tags: ["network", "alarm", "sensor"],
    links: [
      {
        title: "Guide for Analog Signal Clipping at ADC Input",
        url: "https://docs.industrial.support/solution/ai-sol-12/guide",
      },
      {
        title: "FAQ for Analog Signal Clipping at ADC Input",
        url: "https://docs.internal/faq/ai-sol-12",
      },
    ],
    documents: [
      {
        name: "Analog Signal Clipping at ADC Input Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Analog Signal Clipping at ADC Input Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T09:15:00Z",
  },
  {
    id: "AI-SOL-013",
    title: "Inverter Module Communication Timeout",
    description:
      "AI-generated steps to troubleshoot the issue: inverter module communication timeout.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.9,
    usageCount: 10,
    lastUsed: "6 hours ago",
    tags: ["communication", "pressure", "vibration"],
    links: [
      {
        title: "Guide for Inverter Module Communication Timeout",
        url: "https://docs.industrial.support/solution/ai-sol-13/guide",
      },
      {
        title: "FAQ for Inverter Module Communication Timeout",
        url: "https://docs.internal/faq/ai-sol-13",
      },
    ],
    documents: [
      {
        name: "Inverter Module Communication Timeout Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inverter Module Communication Timeout Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T09:00:00Z",
  },
  {
    id: "AI-SOL-014",
    title: "Sudden Drop in Production Line Speed",
    description:
      "AI-generated steps to troubleshoot the issue: sudden drop in production line speed.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.86,
    usageCount: 11,
    lastUsed: "6 hours ago",
    tags: ["motor", "controller", "hydraulic"],
    links: [
      {
        title: "Guide for Sudden Drop in Production Line Speed",
        url: "https://docs.industrial.support/solution/ai-sol-14/guide",
      },
      {
        title: "FAQ for Sudden Drop in Production Line Speed",
        url: "https://docs.internal/faq/ai-sol-14",
      },
    ],
    documents: [
      {
        name: "Sudden Drop in Production Line Speed Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Sudden Drop in Production Line Speed Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T08:45:00Z",
  },
  {
    id: "AI-SOL-015",
    title: "PID Loop Oscillations in Temperature Control",
    description:
      "AI-generated steps to troubleshoot the issue: pid loop oscillations in temperature control.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.9,
    usageCount: 19,
    lastUsed: "2 hours ago",
    tags: ["sensor", "firmware", "temperature"],
    links: [
      {
        title: "Guide for PID Loop Oscillations in Temperature Control",
        url: "https://docs.industrial.support/solution/ai-sol-15/guide",
      },
      {
        title: "FAQ for PID Loop Oscillations in Temperature Control",
        url: "https://docs.internal/faq/ai-sol-15",
      },
    ],
    documents: [
      {
        name: "PID Loop Oscillations in Temperature Control Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PID Loop Oscillations in Temperature Control Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T08:30:00Z",
  },
  {
    id: "AI-SOL-016",
    title: "Stepper Motor Stalling at High Speeds",
    description:
      "AI-generated steps to troubleshoot the issue: stepper motor stalling at high speeds.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.85,
    usageCount: 21,
    lastUsed: "9 hours ago",
    tags: ["communication", "relay", "controller"],
    links: [
      {
        title: "Guide for Stepper Motor Stalling at High Speeds",
        url: "https://docs.industrial.support/solution/ai-sol-16/guide",
      },
      {
        title: "FAQ for Stepper Motor Stalling at High Speeds",
        url: "https://docs.internal/faq/ai-sol-16",
      },
    ],
    documents: [
      {
        name: "Stepper Motor Stalling at High Speeds Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Stepper Motor Stalling at High Speeds Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T08:15:00Z",
  },
  {
    id: "AI-SOL-017",
    title: "Inconsistent Temperature Sensor Output",
    description:
      "AI-generated steps to troubleshoot the issue: inconsistent temperature sensor output.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.86,
    usageCount: 11,
    lastUsed: "1 hours ago",
    tags: ["firmware", "hydraulic", "plc"],
    links: [
      {
        title: "Guide for Inconsistent Temperature Sensor Output",
        url: "https://docs.industrial.support/solution/ai-sol-17/guide",
      },
      {
        title: "FAQ for Inconsistent Temperature Sensor Output",
        url: "https://docs.internal/faq/ai-sol-17",
      },
    ],
    documents: [
      {
        name: "Inconsistent Temperature Sensor Output Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inconsistent Temperature Sensor Output Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T08:00:00Z",
  },
  {
    id: "AI-SOL-018",
    title: "Hydraulic Pump Fails to Start",
    description: "AI-generated steps to troubleshoot the issue: hydraulic pump fails to start.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.82,
    usageCount: 10,
    lastUsed: "8 hours ago",
    tags: ["alarm", "motor", "pressure"],
    links: [
      {
        title: "Guide for Hydraulic Pump Fails to Start",
        url: "https://docs.industrial.support/solution/ai-sol-18/guide",
      },
      {
        title: "FAQ for Hydraulic Pump Fails to Start",
        url: "https://docs.internal/faq/ai-sol-18",
      },
    ],
    documents: [
      {
        name: "Hydraulic Pump Fails to Start Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Hydraulic Pump Fails to Start Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T07:45:00Z",
  },
  {
    id: "AI-SOL-019",
    title: "Vibration Levels Exceeding Threshold",
    description:
      "AI-generated steps to troubleshoot the issue: vibration levels exceeding threshold.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.85,
    usageCount: 6,
    lastUsed: "8 hours ago",
    tags: ["plc", "alarm", "firmware"],
    links: [
      {
        title: "Guide for Vibration Levels Exceeding Threshold",
        url: "https://docs.industrial.support/solution/ai-sol-19/guide",
      },
      {
        title: "FAQ for Vibration Levels Exceeding Threshold",
        url: "https://docs.internal/faq/ai-sol-19",
      },
    ],
    documents: [
      {
        name: "Vibration Levels Exceeding Threshold Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Vibration Levels Exceeding Threshold Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T07:30:00Z",
  },
  {
    id: "AI-SOL-020",
    title: "PLC Not Recognizing Input Module",
    description: "AI-generated steps to troubleshoot the issue: plc not recognizing input module.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.83,
    usageCount: 16,
    lastUsed: "1 hours ago",
    tags: ["motor", "controller", "communication"],
    links: [
      {
        title: "Guide for PLC Not Recognizing Input Module",
        url: "https://docs.industrial.support/solution/ai-sol-20/guide",
      },
      {
        title: "FAQ for PLC Not Recognizing Input Module",
        url: "https://docs.internal/faq/ai-sol-20",
      },
    ],
    documents: [
      {
        name: "PLC Not Recognizing Input Module Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PLC Not Recognizing Input Module Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T07:15:00Z",
  },
  {
    id: "AI-SOL-021",
    title: "Slow Network Response from Control System",
    description:
      "AI-generated steps to troubleshoot the issue: slow network response from control system.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.78,
    usageCount: 4,
    lastUsed: "9 hours ago",
    tags: ["temperature", "firmware", "pressure"],
    links: [
      {
        title: "Guide for Slow Network Response from Control System",
        url: "https://docs.industrial.support/solution/ai-sol-21/guide",
      },
      {
        title: "FAQ for Slow Network Response from Control System",
        url: "https://docs.internal/faq/ai-sol-21",
      },
    ],
    documents: [
      {
        name: "Slow Network Response from Control System Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Slow Network Response from Control System Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T07:00:00Z",
  },
  {
    id: "AI-SOL-022",
    title: "Unexpected Alarm on Cooling Fan",
    description: "AI-generated steps to troubleshoot the issue: unexpected alarm on cooling fan.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.96,
    usageCount: 13,
    lastUsed: "5 hours ago",
    tags: ["pressure", "sensor", "hydraulic"],
    links: [
      {
        title: "Guide for Unexpected Alarm on Cooling Fan",
        url: "https://docs.industrial.support/solution/ai-sol-22/guide",
      },
      {
        title: "FAQ for Unexpected Alarm on Cooling Fan",
        url: "https://docs.internal/faq/ai-sol-22",
      },
    ],
    documents: [
      {
        name: "Unexpected Alarm on Cooling Fan Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Unexpected Alarm on Cooling Fan Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T06:45:00Z",
  },
  {
    id: "AI-SOL-023",
    title: "Pressure Valve Misreporting Readings",
    description:
      "AI-generated steps to troubleshoot the issue: pressure valve misreporting readings.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.9,
    usageCount: 17,
    lastUsed: "5 hours ago",
    tags: ["hydraulic", "pressure", "plc"],
    links: [
      {
        title: "Guide for Pressure Valve Misreporting Readings",
        url: "https://docs.industrial.support/solution/ai-sol-23/guide",
      },
      {
        title: "FAQ for Pressure Valve Misreporting Readings",
        url: "https://docs.internal/faq/ai-sol-23",
      },
    ],
    documents: [
      {
        name: "Pressure Valve Misreporting Readings Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Pressure Valve Misreporting Readings Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T06:30:00Z",
  },
  {
    id: "AI-SOL-024",
    title: "Firmware Update Failure on Controller",
    description:
      "AI-generated steps to troubleshoot the issue: firmware update failure on controller.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.8,
    usageCount: 23,
    lastUsed: "7 hours ago",
    tags: ["firmware", "controller", "vibration"],
    links: [
      {
        title: "Guide for Firmware Update Failure on Controller",
        url: "https://docs.industrial.support/solution/ai-sol-24/guide",
      },
      {
        title: "FAQ for Firmware Update Failure on Controller",
        url: "https://docs.internal/faq/ai-sol-24",
      },
    ],
    documents: [
      {
        name: "Firmware Update Failure on Controller Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Firmware Update Failure on Controller Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T06:15:00Z",
  },
  {
    id: "AI-SOL-025",
    title: "Relay Module Not Engaging",
    description: "AI-generated steps to troubleshoot the issue: relay module not engaging.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.88,
    usageCount: 5,
    lastUsed: "8 hours ago",
    tags: ["calibration", "firmware", "vibration"],
    links: [
      {
        title: "Guide for Relay Module Not Engaging",
        url: "https://docs.industrial.support/solution/ai-sol-25/guide",
      },
      {
        title: "FAQ for Relay Module Not Engaging",
        url: "https://docs.internal/faq/ai-sol-25",
      },
    ],
    documents: [
      {
        name: "Relay Module Not Engaging Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Relay Module Not Engaging Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T06:00:00Z",
  },
  {
    id: "AI-SOL-026",
    title: "Overvoltage Detected in Control Cabinet",
    description:
      "AI-generated steps to troubleshoot the issue: overvoltage detected in control cabinet.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.87,
    usageCount: 9,
    lastUsed: "5 hours ago",
    tags: ["alarm", "communication", "motor"],
    links: [
      {
        title: "Guide for Overvoltage Detected in Control Cabinet",
        url: "https://docs.industrial.support/solution/ai-sol-26/guide",
      },
      {
        title: "FAQ for Overvoltage Detected in Control Cabinet",
        url: "https://docs.internal/faq/ai-sol-26",
      },
    ],
    documents: [
      {
        name: "Overvoltage Detected in Control Cabinet Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Overvoltage Detected in Control Cabinet Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T05:45:00Z",
  },
  {
    id: "AI-SOL-027",
    title: "Analog Signal Clipping at ADC Input",
    description:
      "AI-generated steps to troubleshoot the issue: analog signal clipping at adc input.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.85,
    usageCount: 12,
    lastUsed: "7 hours ago",
    tags: ["plc", "controller", "firmware"],
    links: [
      {
        title: "Guide for Analog Signal Clipping at ADC Input",
        url: "https://docs.industrial.support/solution/ai-sol-27/guide",
      },
      {
        title: "FAQ for Analog Signal Clipping at ADC Input",
        url: "https://docs.internal/faq/ai-sol-27",
      },
    ],
    documents: [
      {
        name: "Analog Signal Clipping at ADC Input Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Analog Signal Clipping at ADC Input Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T05:30:00Z",
  },
  {
    id: "AI-SOL-028",
    title: "Inverter Module Communication Timeout",
    description:
      "AI-generated steps to troubleshoot the issue: inverter module communication timeout.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.79,
    usageCount: 13,
    lastUsed: "9 hours ago",
    tags: ["firmware", "calibration", "hydraulic"],
    links: [
      {
        title: "Guide for Inverter Module Communication Timeout",
        url: "https://docs.industrial.support/solution/ai-sol-28/guide",
      },
      {
        title: "FAQ for Inverter Module Communication Timeout",
        url: "https://docs.internal/faq/ai-sol-28",
      },
    ],
    documents: [
      {
        name: "Inverter Module Communication Timeout Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inverter Module Communication Timeout Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T05:15:00Z",
  },
  {
    id: "AI-SOL-029",
    title: "Sudden Drop in Production Line Speed",
    description:
      "AI-generated steps to troubleshoot the issue: sudden drop in production line speed.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.78,
    usageCount: 20,
    lastUsed: "2 hours ago",
    tags: ["plc", "sensor", "pressure"],
    links: [
      {
        title: "Guide for Sudden Drop in Production Line Speed",
        url: "https://docs.industrial.support/solution/ai-sol-29/guide",
      },
      {
        title: "FAQ for Sudden Drop in Production Line Speed",
        url: "https://docs.internal/faq/ai-sol-29",
      },
    ],
    documents: [
      {
        name: "Sudden Drop in Production Line Speed Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Sudden Drop in Production Line Speed Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T05:00:00Z",
  },
  {
    id: "AI-SOL-030",
    title: "PID Loop Oscillations in Temperature Control",
    description:
      "AI-generated steps to troubleshoot the issue: pid loop oscillations in temperature control.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.96,
    usageCount: 18,
    lastUsed: "5 hours ago",
    tags: ["firmware", "controller", "sensor"],
    links: [
      {
        title: "Guide for PID Loop Oscillations in Temperature Control",
        url: "https://docs.industrial.support/solution/ai-sol-30/guide",
      },
      {
        title: "FAQ for PID Loop Oscillations in Temperature Control",
        url: "https://docs.internal/faq/ai-sol-30",
      },
    ],
    documents: [
      {
        name: "PID Loop Oscillations in Temperature Control Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PID Loop Oscillations in Temperature Control Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T04:45:00Z",
  },
  {
    id: "AI-SOL-031",
    title: "Stepper Motor Stalling at High Speeds",
    description:
      "AI-generated steps to troubleshoot the issue: stepper motor stalling at high speeds.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.86,
    usageCount: 22,
    lastUsed: "2 hours ago",
    tags: ["controller", "alarm", "sensor"],
    links: [
      {
        title: "Guide for Stepper Motor Stalling at High Speeds",
        url: "https://docs.industrial.support/solution/ai-sol-31/guide",
      },
      {
        title: "FAQ for Stepper Motor Stalling at High Speeds",
        url: "https://docs.internal/faq/ai-sol-31",
      },
    ],
    documents: [
      {
        name: "Stepper Motor Stalling at High Speeds Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Stepper Motor Stalling at High Speeds Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T04:30:00Z",
  },
  {
    id: "AI-SOL-032",
    title: "Inconsistent Temperature Sensor Output",
    description:
      "AI-generated steps to troubleshoot the issue: inconsistent temperature sensor output.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.92,
    usageCount: 3,
    lastUsed: "6 hours ago",
    tags: ["controller", "relay", "vibration"],
    links: [
      {
        title: "Guide for Inconsistent Temperature Sensor Output",
        url: "https://docs.industrial.support/solution/ai-sol-32/guide",
      },
      {
        title: "FAQ for Inconsistent Temperature Sensor Output",
        url: "https://docs.internal/faq/ai-sol-32",
      },
    ],
    documents: [
      {
        name: "Inconsistent Temperature Sensor Output Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inconsistent Temperature Sensor Output Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T04:15:00Z",
  },
  {
    id: "AI-SOL-033",
    title: "Hydraulic Pump Fails to Start",
    description: "AI-generated steps to troubleshoot the issue: hydraulic pump fails to start.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.83,
    usageCount: 8,
    lastUsed: "1 hours ago",
    tags: ["vibration", "sensor", "controller"],
    links: [
      {
        title: "Guide for Hydraulic Pump Fails to Start",
        url: "https://docs.industrial.support/solution/ai-sol-33/guide",
      },
      {
        title: "FAQ for Hydraulic Pump Fails to Start",
        url: "https://docs.internal/faq/ai-sol-33",
      },
    ],
    documents: [
      {
        name: "Hydraulic Pump Fails to Start Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Hydraulic Pump Fails to Start Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T04:00:00Z",
  },
  {
    id: "AI-SOL-034",
    title: "Vibration Levels Exceeding Threshold",
    description:
      "AI-generated steps to troubleshoot the issue: vibration levels exceeding threshold.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.8,
    usageCount: 7,
    lastUsed: "1 hours ago",
    tags: ["calibration", "network", "communication"],
    links: [
      {
        title: "Guide for Vibration Levels Exceeding Threshold",
        url: "https://docs.industrial.support/solution/ai-sol-34/guide",
      },
      {
        title: "FAQ for Vibration Levels Exceeding Threshold",
        url: "https://docs.internal/faq/ai-sol-34",
      },
    ],
    documents: [
      {
        name: "Vibration Levels Exceeding Threshold Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Vibration Levels Exceeding Threshold Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T03:45:00Z",
  },
  {
    id: "AI-SOL-035",
    title: "PLC Not Recognizing Input Module",
    description: "AI-generated steps to troubleshoot the issue: plc not recognizing input module.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.84,
    usageCount: 12,
    lastUsed: "8 hours ago",
    tags: ["plc", "firmware", "controller"],
    links: [
      {
        title: "Guide for PLC Not Recognizing Input Module",
        url: "https://docs.industrial.support/solution/ai-sol-35/guide",
      },
      {
        title: "FAQ for PLC Not Recognizing Input Module",
        url: "https://docs.internal/faq/ai-sol-35",
      },
    ],
    documents: [
      {
        name: "PLC Not Recognizing Input Module Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PLC Not Recognizing Input Module Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T03:30:00Z",
  },
  {
    id: "AI-SOL-036",
    title: "Slow Network Response from Control System",
    description:
      "AI-generated steps to troubleshoot the issue: slow network response from control system.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.97,
    usageCount: 10,
    lastUsed: "1 hours ago",
    tags: ["vibration", "pressure", "hydraulic"],
    links: [
      {
        title: "Guide for Slow Network Response from Control System",
        url: "https://docs.industrial.support/solution/ai-sol-36/guide",
      },
      {
        title: "FAQ for Slow Network Response from Control System",
        url: "https://docs.internal/faq/ai-sol-36",
      },
    ],
    documents: [
      {
        name: "Slow Network Response from Control System Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Slow Network Response from Control System Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T03:15:00Z",
  },
  {
    id: "AI-SOL-037",
    title: "Unexpected Alarm on Cooling Fan",
    description: "AI-generated steps to troubleshoot the issue: unexpected alarm on cooling fan.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.96,
    usageCount: 25,
    lastUsed: "5 hours ago",
    tags: ["calibration", "sensor", "plc"],
    links: [
      {
        title: "Guide for Unexpected Alarm on Cooling Fan",
        url: "https://docs.industrial.support/solution/ai-sol-37/guide",
      },
      {
        title: "FAQ for Unexpected Alarm on Cooling Fan",
        url: "https://docs.internal/faq/ai-sol-37",
      },
    ],
    documents: [
      {
        name: "Unexpected Alarm on Cooling Fan Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Unexpected Alarm on Cooling Fan Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T03:00:00Z",
  },
  {
    id: "AI-SOL-038",
    title: "Pressure Valve Misreporting Readings",
    description:
      "AI-generated steps to troubleshoot the issue: pressure valve misreporting readings.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.84,
    usageCount: 20,
    lastUsed: "5 hours ago",
    tags: ["alarm", "sensor", "vibration"],
    links: [
      {
        title: "Guide for Pressure Valve Misreporting Readings",
        url: "https://docs.industrial.support/solution/ai-sol-38/guide",
      },
      {
        title: "FAQ for Pressure Valve Misreporting Readings",
        url: "https://docs.internal/faq/ai-sol-38",
      },
    ],
    documents: [
      {
        name: "Pressure Valve Misreporting Readings Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Pressure Valve Misreporting Readings Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T02:45:00Z",
  },
  {
    id: "AI-SOL-039",
    title: "Firmware Update Failure on Controller",
    description:
      "AI-generated steps to troubleshoot the issue: firmware update failure on controller.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.85,
    usageCount: 9,
    lastUsed: "3 hours ago",
    tags: ["temperature", "pressure", "firmware"],
    links: [
      {
        title: "Guide for Firmware Update Failure on Controller",
        url: "https://docs.industrial.support/solution/ai-sol-39/guide",
      },
      {
        title: "FAQ for Firmware Update Failure on Controller",
        url: "https://docs.internal/faq/ai-sol-39",
      },
    ],
    documents: [
      {
        name: "Firmware Update Failure on Controller Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Firmware Update Failure on Controller Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T02:30:00Z",
  },
  {
    id: "AI-SOL-040",
    title: "Relay Module Not Engaging",
    description: "AI-generated steps to troubleshoot the issue: relay module not engaging.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.9,
    usageCount: 24,
    lastUsed: "7 hours ago",
    tags: ["vibration", "calibration", "pressure"],
    links: [
      {
        title: "Guide for Relay Module Not Engaging",
        url: "https://docs.industrial.support/solution/ai-sol-40/guide",
      },
      {
        title: "FAQ for Relay Module Not Engaging",
        url: "https://docs.internal/faq/ai-sol-40",
      },
    ],
    documents: [
      {
        name: "Relay Module Not Engaging Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Relay Module Not Engaging Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T02:15:00Z",
  },
  {
    id: "AI-SOL-041",
    title: "Overvoltage Detected in Control Cabinet",
    description:
      "AI-generated steps to troubleshoot the issue: overvoltage detected in control cabinet.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.83,
    usageCount: 11,
    lastUsed: "3 hours ago",
    tags: ["network", "communication", "sensor"],
    links: [
      {
        title: "Guide for Overvoltage Detected in Control Cabinet",
        url: "https://docs.industrial.support/solution/ai-sol-41/guide",
      },
      {
        title: "FAQ for Overvoltage Detected in Control Cabinet",
        url: "https://docs.internal/faq/ai-sol-41",
      },
    ],
    documents: [
      {
        name: "Overvoltage Detected in Control Cabinet Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Overvoltage Detected in Control Cabinet Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T02:00:00Z",
  },
  {
    id: "AI-SOL-042",
    title: "Analog Signal Clipping at ADC Input",
    description:
      "AI-generated steps to troubleshoot the issue: analog signal clipping at adc input.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.86,
    usageCount: 11,
    lastUsed: "5 hours ago",
    tags: ["plc", "communication", "alarm"],
    links: [
      {
        title: "Guide for Analog Signal Clipping at ADC Input",
        url: "https://docs.industrial.support/solution/ai-sol-42/guide",
      },
      {
        title: "FAQ for Analog Signal Clipping at ADC Input",
        url: "https://docs.internal/faq/ai-sol-42",
      },
    ],
    documents: [
      {
        name: "Analog Signal Clipping at ADC Input Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Analog Signal Clipping at ADC Input Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T01:45:00Z",
  },
  {
    id: "AI-SOL-043",
    title: "Inverter Module Communication Timeout",
    description:
      "AI-generated steps to troubleshoot the issue: inverter module communication timeout.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.84,
    usageCount: 21,
    lastUsed: "9 hours ago",
    tags: ["pressure", "alarm", "controller"],
    links: [
      {
        title: "Guide for Inverter Module Communication Timeout",
        url: "https://docs.industrial.support/solution/ai-sol-43/guide",
      },
      {
        title: "FAQ for Inverter Module Communication Timeout",
        url: "https://docs.internal/faq/ai-sol-43",
      },
    ],
    documents: [
      {
        name: "Inverter Module Communication Timeout Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inverter Module Communication Timeout Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T01:30:00Z",
  },
  {
    id: "AI-SOL-044",
    title: "Sudden Drop in Production Line Speed",
    description:
      "AI-generated steps to troubleshoot the issue: sudden drop in production line speed.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.91,
    usageCount: 6,
    lastUsed: "4 hours ago",
    tags: ["pressure", "network", "vibration"],
    links: [
      {
        title: "Guide for Sudden Drop in Production Line Speed",
        url: "https://docs.industrial.support/solution/ai-sol-44/guide",
      },
      {
        title: "FAQ for Sudden Drop in Production Line Speed",
        url: "https://docs.internal/faq/ai-sol-44",
      },
    ],
    documents: [
      {
        name: "Sudden Drop in Production Line Speed Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Sudden Drop in Production Line Speed Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T01:15:00Z",
  },
  {
    id: "AI-SOL-045",
    title: "PID Loop Oscillations in Temperature Control",
    description:
      "AI-generated steps to troubleshoot the issue: pid loop oscillations in temperature control.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.83,
    usageCount: 25,
    lastUsed: "1 hours ago",
    tags: ["plc", "firmware", "temperature"],
    links: [
      {
        title: "Guide for PID Loop Oscillations in Temperature Control",
        url: "https://docs.industrial.support/solution/ai-sol-45/guide",
      },
      {
        title: "FAQ for PID Loop Oscillations in Temperature Control",
        url: "https://docs.internal/faq/ai-sol-45",
      },
    ],
    documents: [
      {
        name: "PID Loop Oscillations in Temperature Control Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PID Loop Oscillations in Temperature Control Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T01:00:00Z",
  },
  {
    id: "AI-SOL-046",
    title: "Stepper Motor Stalling at High Speeds",
    description:
      "AI-generated steps to troubleshoot the issue: stepper motor stalling at high speeds.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.84,
    usageCount: 8,
    lastUsed: "9 hours ago",
    tags: ["hydraulic", "calibration", "vibration"],
    links: [
      {
        title: "Guide for Stepper Motor Stalling at High Speeds",
        url: "https://docs.industrial.support/solution/ai-sol-46/guide",
      },
      {
        title: "FAQ for Stepper Motor Stalling at High Speeds",
        url: "https://docs.internal/faq/ai-sol-46",
      },
    ],
    documents: [
      {
        name: "Stepper Motor Stalling at High Speeds Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Stepper Motor Stalling at High Speeds Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T00:45:00Z",
  },
  {
    id: "AI-SOL-047",
    title: "Inconsistent Temperature Sensor Output",
    description:
      "AI-generated steps to troubleshoot the issue: inconsistent temperature sensor output.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.95,
    usageCount: 16,
    lastUsed: "1 hours ago",
    tags: ["calibration", "firmware", "controller"],
    links: [
      {
        title: "Guide for Inconsistent Temperature Sensor Output",
        url: "https://docs.industrial.support/solution/ai-sol-47/guide",
      },
      {
        title: "FAQ for Inconsistent Temperature Sensor Output",
        url: "https://docs.internal/faq/ai-sol-47",
      },
    ],
    documents: [
      {
        name: "Inconsistent Temperature Sensor Output Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inconsistent Temperature Sensor Output Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T00:30:00Z",
  },
  {
    id: "AI-SOL-048",
    title: "Hydraulic Pump Fails to Start",
    description: "AI-generated steps to troubleshoot the issue: hydraulic pump fails to start.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.88,
    usageCount: 12,
    lastUsed: "7 hours ago",
    tags: ["sensor", "plc", "vibration"],
    links: [
      {
        title: "Guide for Hydraulic Pump Fails to Start",
        url: "https://docs.industrial.support/solution/ai-sol-48/guide",
      },
      {
        title: "FAQ for Hydraulic Pump Fails to Start",
        url: "https://docs.internal/faq/ai-sol-48",
      },
    ],
    documents: [
      {
        name: "Hydraulic Pump Fails to Start Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Hydraulic Pump Fails to Start Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T00:15:00Z",
  },
  {
    id: "AI-SOL-049",
    title: "Vibration Levels Exceeding Threshold",
    description:
      "AI-generated steps to troubleshoot the issue: vibration levels exceeding threshold.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.8,
    usageCount: 16,
    lastUsed: "3 hours ago",
    tags: ["plc", "firmware", "relay"],
    links: [
      {
        title: "Guide for Vibration Levels Exceeding Threshold",
        url: "https://docs.industrial.support/solution/ai-sol-49/guide",
      },
      {
        title: "FAQ for Vibration Levels Exceeding Threshold",
        url: "https://docs.internal/faq/ai-sol-49",
      },
    ],
    documents: [
      {
        name: "Vibration Levels Exceeding Threshold Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Vibration Levels Exceeding Threshold Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-24T00:00:00Z",
  },
  {
    id: "AI-SOL-050",
    title: "PLC Not Recognizing Input Module",
    description: "AI-generated steps to troubleshoot the issue: plc not recognizing input module.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.88,
    usageCount: 22,
    lastUsed: "8 hours ago",
    tags: ["hydraulic", "temperature", "relay"],
    links: [
      {
        title: "Guide for PLC Not Recognizing Input Module",
        url: "https://docs.industrial.support/solution/ai-sol-50/guide",
      },
      {
        title: "FAQ for PLC Not Recognizing Input Module",
        url: "https://docs.internal/faq/ai-sol-50",
      },
    ],
    documents: [
      {
        name: "PLC Not Recognizing Input Module Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PLC Not Recognizing Input Module Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T23:45:00Z",
  },
  {
    id: "AI-SOL-051",
    title: "Slow Network Response from Control System",
    description:
      "AI-generated steps to troubleshoot the issue: slow network response from control system.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.84,
    usageCount: 24,
    lastUsed: "4 hours ago",
    tags: ["controller", "temperature", "hydraulic"],
    links: [
      {
        title: "Guide for Slow Network Response from Control System",
        url: "https://docs.industrial.support/solution/ai-sol-51/guide",
      },
      {
        title: "FAQ for Slow Network Response from Control System",
        url: "https://docs.internal/faq/ai-sol-51",
      },
    ],
    documents: [
      {
        name: "Slow Network Response from Control System Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Slow Network Response from Control System Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T23:30:00Z",
  },
  {
    id: "AI-SOL-052",
    title: "Unexpected Alarm on Cooling Fan",
    description: "AI-generated steps to troubleshoot the issue: unexpected alarm on cooling fan.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.91,
    usageCount: 12,
    lastUsed: "7 hours ago",
    tags: ["calibration", "motor", "pressure"],
    links: [
      {
        title: "Guide for Unexpected Alarm on Cooling Fan",
        url: "https://docs.industrial.support/solution/ai-sol-52/guide",
      },
      {
        title: "FAQ for Unexpected Alarm on Cooling Fan",
        url: "https://docs.internal/faq/ai-sol-52",
      },
    ],
    documents: [
      {
        name: "Unexpected Alarm on Cooling Fan Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Unexpected Alarm on Cooling Fan Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T23:15:00Z",
  },
  {
    id: "AI-SOL-053",
    title: "Pressure Valve Misreporting Readings",
    description:
      "AI-generated steps to troubleshoot the issue: pressure valve misreporting readings.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.86,
    usageCount: 18,
    lastUsed: "2 hours ago",
    tags: ["temperature", "relay", "alarm"],
    links: [
      {
        title: "Guide for Pressure Valve Misreporting Readings",
        url: "https://docs.industrial.support/solution/ai-sol-53/guide",
      },
      {
        title: "FAQ for Pressure Valve Misreporting Readings",
        url: "https://docs.internal/faq/ai-sol-53",
      },
    ],
    documents: [
      {
        name: "Pressure Valve Misreporting Readings Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Pressure Valve Misreporting Readings Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T23:00:00Z",
  },
  {
    id: "AI-SOL-054",
    title: "Firmware Update Failure on Controller",
    description:
      "AI-generated steps to troubleshoot the issue: firmware update failure on controller.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.91,
    usageCount: 13,
    lastUsed: "5 hours ago",
    tags: ["vibration", "sensor", "communication"],
    links: [
      {
        title: "Guide for Firmware Update Failure on Controller",
        url: "https://docs.industrial.support/solution/ai-sol-54/guide",
      },
      {
        title: "FAQ for Firmware Update Failure on Controller",
        url: "https://docs.internal/faq/ai-sol-54",
      },
    ],
    documents: [
      {
        name: "Firmware Update Failure on Controller Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Firmware Update Failure on Controller Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T22:45:00Z",
  },
  {
    id: "AI-SOL-055",
    title: "Relay Module Not Engaging",
    description: "AI-generated steps to troubleshoot the issue: relay module not engaging.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.9,
    usageCount: 8,
    lastUsed: "9 hours ago",
    tags: ["controller", "temperature", "hydraulic"],
    links: [
      {
        title: "Guide for Relay Module Not Engaging",
        url: "https://docs.industrial.support/solution/ai-sol-55/guide",
      },
      {
        title: "FAQ for Relay Module Not Engaging",
        url: "https://docs.internal/faq/ai-sol-55",
      },
    ],
    documents: [
      {
        name: "Relay Module Not Engaging Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Relay Module Not Engaging Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T22:30:00Z",
  },
  {
    id: "AI-SOL-056",
    title: "Overvoltage Detected in Control Cabinet",
    description:
      "AI-generated steps to troubleshoot the issue: overvoltage detected in control cabinet.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.82,
    usageCount: 24,
    lastUsed: "3 hours ago",
    tags: ["temperature", "communication", "pressure"],
    links: [
      {
        title: "Guide for Overvoltage Detected in Control Cabinet",
        url: "https://docs.industrial.support/solution/ai-sol-56/guide",
      },
      {
        title: "FAQ for Overvoltage Detected in Control Cabinet",
        url: "https://docs.internal/faq/ai-sol-56",
      },
    ],
    documents: [
      {
        name: "Overvoltage Detected in Control Cabinet Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Overvoltage Detected in Control Cabinet Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T22:15:00Z",
  },
  {
    id: "AI-SOL-057",
    title: "Analog Signal Clipping at ADC Input",
    description:
      "AI-generated steps to troubleshoot the issue: analog signal clipping at adc input.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.95,
    usageCount: 19,
    lastUsed: "6 hours ago",
    tags: ["alarm", "communication", "calibration"],
    links: [
      {
        title: "Guide for Analog Signal Clipping at ADC Input",
        url: "https://docs.industrial.support/solution/ai-sol-57/guide",
      },
      {
        title: "FAQ for Analog Signal Clipping at ADC Input",
        url: "https://docs.internal/faq/ai-sol-57",
      },
    ],
    documents: [
      {
        name: "Analog Signal Clipping at ADC Input Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Analog Signal Clipping at ADC Input Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T22:00:00Z",
  },
  {
    id: "AI-SOL-058",
    title: "Inverter Module Communication Timeout",
    description:
      "AI-generated steps to troubleshoot the issue: inverter module communication timeout.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.86,
    usageCount: 25,
    lastUsed: "8 hours ago",
    tags: ["communication", "network", "pressure"],
    links: [
      {
        title: "Guide for Inverter Module Communication Timeout",
        url: "https://docs.industrial.support/solution/ai-sol-58/guide",
      },
      {
        title: "FAQ for Inverter Module Communication Timeout",
        url: "https://docs.internal/faq/ai-sol-58",
      },
    ],
    documents: [
      {
        name: "Inverter Module Communication Timeout Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inverter Module Communication Timeout Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T21:45:00Z",
  },
  {
    id: "AI-SOL-059",
    title: "Sudden Drop in Production Line Speed",
    description:
      "AI-generated steps to troubleshoot the issue: sudden drop in production line speed.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.91,
    usageCount: 16,
    lastUsed: "8 hours ago",
    tags: ["vibration", "relay", "hydraulic"],
    links: [
      {
        title: "Guide for Sudden Drop in Production Line Speed",
        url: "https://docs.industrial.support/solution/ai-sol-59/guide",
      },
      {
        title: "FAQ for Sudden Drop in Production Line Speed",
        url: "https://docs.internal/faq/ai-sol-59",
      },
    ],
    documents: [
      {
        name: "Sudden Drop in Production Line Speed Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Sudden Drop in Production Line Speed Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T21:30:00Z",
  },
  {
    id: "AI-SOL-060",
    title: "PID Loop Oscillations in Temperature Control",
    description:
      "AI-generated steps to troubleshoot the issue: pid loop oscillations in temperature control.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.81,
    usageCount: 10,
    lastUsed: "6 hours ago",
    tags: ["calibration", "vibration", "firmware"],
    links: [
      {
        title: "Guide for PID Loop Oscillations in Temperature Control",
        url: "https://docs.industrial.support/solution/ai-sol-60/guide",
      },
      {
        title: "FAQ for PID Loop Oscillations in Temperature Control",
        url: "https://docs.internal/faq/ai-sol-60",
      },
    ],
    documents: [
      {
        name: "PID Loop Oscillations in Temperature Control Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PID Loop Oscillations in Temperature Control Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T21:15:00Z",
  },
  {
    id: "AI-SOL-061",
    title: "Stepper Motor Stalling at High Speeds",
    description:
      "AI-generated steps to troubleshoot the issue: stepper motor stalling at high speeds.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.92,
    usageCount: 9,
    lastUsed: "6 hours ago",
    tags: ["sensor", "communication", "calibration"],
    links: [
      {
        title: "Guide for Stepper Motor Stalling at High Speeds",
        url: "https://docs.industrial.support/solution/ai-sol-61/guide",
      },
      {
        title: "FAQ for Stepper Motor Stalling at High Speeds",
        url: "https://docs.internal/faq/ai-sol-61",
      },
    ],
    documents: [
      {
        name: "Stepper Motor Stalling at High Speeds Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Stepper Motor Stalling at High Speeds Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T21:00:00Z",
  },
  {
    id: "AI-SOL-062",
    title: "Inconsistent Temperature Sensor Output",
    description:
      "AI-generated steps to troubleshoot the issue: inconsistent temperature sensor output.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.91,
    usageCount: 17,
    lastUsed: "9 hours ago",
    tags: ["firmware", "motor", "plc"],
    links: [
      {
        title: "Guide for Inconsistent Temperature Sensor Output",
        url: "https://docs.industrial.support/solution/ai-sol-62/guide",
      },
      {
        title: "FAQ for Inconsistent Temperature Sensor Output",
        url: "https://docs.internal/faq/ai-sol-62",
      },
    ],
    documents: [
      {
        name: "Inconsistent Temperature Sensor Output Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inconsistent Temperature Sensor Output Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T20:45:00Z",
  },
  {
    id: "AI-SOL-063",
    title: "Hydraulic Pump Fails to Start",
    description: "AI-generated steps to troubleshoot the issue: hydraulic pump fails to start.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.94,
    usageCount: 12,
    lastUsed: "9 hours ago",
    tags: ["calibration", "motor", "temperature"],
    links: [
      {
        title: "Guide for Hydraulic Pump Fails to Start",
        url: "https://docs.industrial.support/solution/ai-sol-63/guide",
      },
      {
        title: "FAQ for Hydraulic Pump Fails to Start",
        url: "https://docs.internal/faq/ai-sol-63",
      },
    ],
    documents: [
      {
        name: "Hydraulic Pump Fails to Start Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Hydraulic Pump Fails to Start Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T20:30:00Z",
  },
  {
    id: "AI-SOL-064",
    title: "Vibration Levels Exceeding Threshold",
    description:
      "AI-generated steps to troubleshoot the issue: vibration levels exceeding threshold.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.82,
    usageCount: 5,
    lastUsed: "8 hours ago",
    tags: ["network", "plc", "pressure"],
    links: [
      {
        title: "Guide for Vibration Levels Exceeding Threshold",
        url: "https://docs.industrial.support/solution/ai-sol-64/guide",
      },
      {
        title: "FAQ for Vibration Levels Exceeding Threshold",
        url: "https://docs.internal/faq/ai-sol-64",
      },
    ],
    documents: [
      {
        name: "Vibration Levels Exceeding Threshold Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Vibration Levels Exceeding Threshold Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T20:15:00Z",
  },
  {
    id: "AI-SOL-065",
    title: "PLC Not Recognizing Input Module",
    description: "AI-generated steps to troubleshoot the issue: plc not recognizing input module.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.93,
    usageCount: 6,
    lastUsed: "8 hours ago",
    tags: ["communication", "plc", "pressure"],
    links: [
      {
        title: "Guide for PLC Not Recognizing Input Module",
        url: "https://docs.industrial.support/solution/ai-sol-65/guide",
      },
      {
        title: "FAQ for PLC Not Recognizing Input Module",
        url: "https://docs.internal/faq/ai-sol-65",
      },
    ],
    documents: [
      {
        name: "PLC Not Recognizing Input Module Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PLC Not Recognizing Input Module Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T20:00:00Z",
  },
  {
    id: "AI-SOL-066",
    title: "Slow Network Response from Control System",
    description:
      "AI-generated steps to troubleshoot the issue: slow network response from control system.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.92,
    usageCount: 23,
    lastUsed: "2 hours ago",
    tags: ["firmware", "calibration", "temperature"],
    links: [
      {
        title: "Guide for Slow Network Response from Control System",
        url: "https://docs.industrial.support/solution/ai-sol-66/guide",
      },
      {
        title: "FAQ for Slow Network Response from Control System",
        url: "https://docs.internal/faq/ai-sol-66",
      },
    ],
    documents: [
      {
        name: "Slow Network Response from Control System Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Slow Network Response from Control System Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T19:45:00Z",
  },
  {
    id: "AI-SOL-067",
    title: "Unexpected Alarm on Cooling Fan",
    description: "AI-generated steps to troubleshoot the issue: unexpected alarm on cooling fan.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.83,
    usageCount: 7,
    lastUsed: "2 hours ago",
    tags: ["relay", "sensor", "alarm"],
    links: [
      {
        title: "Guide for Unexpected Alarm on Cooling Fan",
        url: "https://docs.industrial.support/solution/ai-sol-67/guide",
      },
      {
        title: "FAQ for Unexpected Alarm on Cooling Fan",
        url: "https://docs.internal/faq/ai-sol-67",
      },
    ],
    documents: [
      {
        name: "Unexpected Alarm on Cooling Fan Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Unexpected Alarm on Cooling Fan Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T19:30:00Z",
  },
  {
    id: "AI-SOL-068",
    title: "Pressure Valve Misreporting Readings",
    description:
      "AI-generated steps to troubleshoot the issue: pressure valve misreporting readings.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.96,
    usageCount: 24,
    lastUsed: "5 hours ago",
    tags: ["calibration", "alarm", "sensor"],
    links: [
      {
        title: "Guide for Pressure Valve Misreporting Readings",
        url: "https://docs.industrial.support/solution/ai-sol-68/guide",
      },
      {
        title: "FAQ for Pressure Valve Misreporting Readings",
        url: "https://docs.internal/faq/ai-sol-68",
      },
    ],
    documents: [
      {
        name: "Pressure Valve Misreporting Readings Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Pressure Valve Misreporting Readings Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T19:15:00Z",
  },
  {
    id: "AI-SOL-069",
    title: "Firmware Update Failure on Controller",
    description:
      "AI-generated steps to troubleshoot the issue: firmware update failure on controller.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.93,
    usageCount: 16,
    lastUsed: "2 hours ago",
    tags: ["plc", "network", "motor"],
    links: [
      {
        title: "Guide for Firmware Update Failure on Controller",
        url: "https://docs.industrial.support/solution/ai-sol-69/guide",
      },
      {
        title: "FAQ for Firmware Update Failure on Controller",
        url: "https://docs.internal/faq/ai-sol-69",
      },
    ],
    documents: [
      {
        name: "Firmware Update Failure on Controller Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Firmware Update Failure on Controller Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T19:00:00Z",
  },
  {
    id: "AI-SOL-070",
    title: "Relay Module Not Engaging",
    description: "AI-generated steps to troubleshoot the issue: relay module not engaging.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.86,
    usageCount: 11,
    lastUsed: "8 hours ago",
    tags: ["sensor", "pressure", "vibration"],
    links: [
      {
        title: "Guide for Relay Module Not Engaging",
        url: "https://docs.industrial.support/solution/ai-sol-70/guide",
      },
      {
        title: "FAQ for Relay Module Not Engaging",
        url: "https://docs.internal/faq/ai-sol-70",
      },
    ],
    documents: [
      {
        name: "Relay Module Not Engaging Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Relay Module Not Engaging Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T18:45:00Z",
  },
  {
    id: "AI-SOL-071",
    title: "Overvoltage Detected in Control Cabinet",
    description:
      "AI-generated steps to troubleshoot the issue: overvoltage detected in control cabinet.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.96,
    usageCount: 10,
    lastUsed: "4 hours ago",
    tags: ["vibration", "temperature", "plc"],
    links: [
      {
        title: "Guide for Overvoltage Detected in Control Cabinet",
        url: "https://docs.industrial.support/solution/ai-sol-71/guide",
      },
      {
        title: "FAQ for Overvoltage Detected in Control Cabinet",
        url: "https://docs.internal/faq/ai-sol-71",
      },
    ],
    documents: [
      {
        name: "Overvoltage Detected in Control Cabinet Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Overvoltage Detected in Control Cabinet Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T18:30:00Z",
  },
  {
    id: "AI-SOL-072",
    title: "Analog Signal Clipping at ADC Input",
    description:
      "AI-generated steps to troubleshoot the issue: analog signal clipping at adc input.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.87,
    usageCount: 21,
    lastUsed: "3 hours ago",
    tags: ["pressure", "plc", "relay"],
    links: [
      {
        title: "Guide for Analog Signal Clipping at ADC Input",
        url: "https://docs.industrial.support/solution/ai-sol-72/guide",
      },
      {
        title: "FAQ for Analog Signal Clipping at ADC Input",
        url: "https://docs.internal/faq/ai-sol-72",
      },
    ],
    documents: [
      {
        name: "Analog Signal Clipping at ADC Input Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Analog Signal Clipping at ADC Input Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T18:15:00Z",
  },
  {
    id: "AI-SOL-073",
    title: "Inverter Module Communication Timeout",
    description:
      "AI-generated steps to troubleshoot the issue: inverter module communication timeout.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.89,
    usageCount: 25,
    lastUsed: "7 hours ago",
    tags: ["network", "communication", "temperature"],
    links: [
      {
        title: "Guide for Inverter Module Communication Timeout",
        url: "https://docs.industrial.support/solution/ai-sol-73/guide",
      },
      {
        title: "FAQ for Inverter Module Communication Timeout",
        url: "https://docs.internal/faq/ai-sol-73",
      },
    ],
    documents: [
      {
        name: "Inverter Module Communication Timeout Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inverter Module Communication Timeout Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T18:00:00Z",
  },
  {
    id: "AI-SOL-074",
    title: "Sudden Drop in Production Line Speed",
    description:
      "AI-generated steps to troubleshoot the issue: sudden drop in production line speed.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.81,
    usageCount: 6,
    lastUsed: "9 hours ago",
    tags: ["sensor", "relay", "communication"],
    links: [
      {
        title: "Guide for Sudden Drop in Production Line Speed",
        url: "https://docs.industrial.support/solution/ai-sol-74/guide",
      },
      {
        title: "FAQ for Sudden Drop in Production Line Speed",
        url: "https://docs.internal/faq/ai-sol-74",
      },
    ],
    documents: [
      {
        name: "Sudden Drop in Production Line Speed Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Sudden Drop in Production Line Speed Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T17:45:00Z",
  },
  {
    id: "AI-SOL-075",
    title: "PID Loop Oscillations in Temperature Control",
    description:
      "AI-generated steps to troubleshoot the issue: pid loop oscillations in temperature control.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.79,
    usageCount: 20,
    lastUsed: "2 hours ago",
    tags: ["temperature", "firmware", "network"],
    links: [
      {
        title: "Guide for PID Loop Oscillations in Temperature Control",
        url: "https://docs.industrial.support/solution/ai-sol-75/guide",
      },
      {
        title: "FAQ for PID Loop Oscillations in Temperature Control",
        url: "https://docs.internal/faq/ai-sol-75",
      },
    ],
    documents: [
      {
        name: "PID Loop Oscillations in Temperature Control Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PID Loop Oscillations in Temperature Control Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T17:30:00Z",
  },
  {
    id: "AI-SOL-076",
    title: "Stepper Motor Stalling at High Speeds",
    description:
      "AI-generated steps to troubleshoot the issue: stepper motor stalling at high speeds.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.84,
    usageCount: 5,
    lastUsed: "3 hours ago",
    tags: ["network", "plc", "temperature"],
    links: [
      {
        title: "Guide for Stepper Motor Stalling at High Speeds",
        url: "https://docs.industrial.support/solution/ai-sol-76/guide",
      },
      {
        title: "FAQ for Stepper Motor Stalling at High Speeds",
        url: "https://docs.internal/faq/ai-sol-76",
      },
    ],
    documents: [
      {
        name: "Stepper Motor Stalling at High Speeds Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Stepper Motor Stalling at High Speeds Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T17:15:00Z",
  },
  {
    id: "AI-SOL-077",
    title: "Inconsistent Temperature Sensor Output",
    description:
      "AI-generated steps to troubleshoot the issue: inconsistent temperature sensor output.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.8,
    usageCount: 20,
    lastUsed: "6 hours ago",
    tags: ["pressure", "calibration", "temperature"],
    links: [
      {
        title: "Guide for Inconsistent Temperature Sensor Output",
        url: "https://docs.industrial.support/solution/ai-sol-77/guide",
      },
      {
        title: "FAQ for Inconsistent Temperature Sensor Output",
        url: "https://docs.internal/faq/ai-sol-77",
      },
    ],
    documents: [
      {
        name: "Inconsistent Temperature Sensor Output Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inconsistent Temperature Sensor Output Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T17:00:00Z",
  },
  {
    id: "AI-SOL-078",
    title: "Hydraulic Pump Fails to Start",
    description: "AI-generated steps to troubleshoot the issue: hydraulic pump fails to start.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.96,
    usageCount: 25,
    lastUsed: "4 hours ago",
    tags: ["calibration", "motor", "plc"],
    links: [
      {
        title: "Guide for Hydraulic Pump Fails to Start",
        url: "https://docs.industrial.support/solution/ai-sol-78/guide",
      },
      {
        title: "FAQ for Hydraulic Pump Fails to Start",
        url: "https://docs.internal/faq/ai-sol-78",
      },
    ],
    documents: [
      {
        name: "Hydraulic Pump Fails to Start Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Hydraulic Pump Fails to Start Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T16:45:00Z",
  },
  {
    id: "AI-SOL-079",
    title: "Vibration Levels Exceeding Threshold",
    description:
      "AI-generated steps to troubleshoot the issue: vibration levels exceeding threshold.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.9,
    usageCount: 25,
    lastUsed: "7 hours ago",
    tags: ["controller", "plc", "calibration"],
    links: [
      {
        title: "Guide for Vibration Levels Exceeding Threshold",
        url: "https://docs.industrial.support/solution/ai-sol-79/guide",
      },
      {
        title: "FAQ for Vibration Levels Exceeding Threshold",
        url: "https://docs.internal/faq/ai-sol-79",
      },
    ],
    documents: [
      {
        name: "Vibration Levels Exceeding Threshold Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Vibration Levels Exceeding Threshold Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T16:30:00Z",
  },
  {
    id: "AI-SOL-080",
    title: "PLC Not Recognizing Input Module",
    description: "AI-generated steps to troubleshoot the issue: plc not recognizing input module.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.95,
    usageCount: 5,
    lastUsed: "3 hours ago",
    tags: ["vibration", "plc", "calibration"],
    links: [
      {
        title: "Guide for PLC Not Recognizing Input Module",
        url: "https://docs.industrial.support/solution/ai-sol-80/guide",
      },
      {
        title: "FAQ for PLC Not Recognizing Input Module",
        url: "https://docs.internal/faq/ai-sol-80",
      },
    ],
    documents: [
      {
        name: "PLC Not Recognizing Input Module Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PLC Not Recognizing Input Module Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T16:15:00Z",
  },
  {
    id: "AI-SOL-081",
    title: "Slow Network Response from Control System",
    description:
      "AI-generated steps to troubleshoot the issue: slow network response from control system.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.82,
    usageCount: 8,
    lastUsed: "7 hours ago",
    tags: ["plc", "calibration", "firmware"],
    links: [
      {
        title: "Guide for Slow Network Response from Control System",
        url: "https://docs.industrial.support/solution/ai-sol-81/guide",
      },
      {
        title: "FAQ for Slow Network Response from Control System",
        url: "https://docs.internal/faq/ai-sol-81",
      },
    ],
    documents: [
      {
        name: "Slow Network Response from Control System Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Slow Network Response from Control System Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T16:00:00Z",
  },
  {
    id: "AI-SOL-082",
    title: "Unexpected Alarm on Cooling Fan",
    description: "AI-generated steps to troubleshoot the issue: unexpected alarm on cooling fan.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.84,
    usageCount: 14,
    lastUsed: "9 hours ago",
    tags: ["temperature", "calibration", "firmware"],
    links: [
      {
        title: "Guide for Unexpected Alarm on Cooling Fan",
        url: "https://docs.industrial.support/solution/ai-sol-82/guide",
      },
      {
        title: "FAQ for Unexpected Alarm on Cooling Fan",
        url: "https://docs.internal/faq/ai-sol-82",
      },
    ],
    documents: [
      {
        name: "Unexpected Alarm on Cooling Fan Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Unexpected Alarm on Cooling Fan Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T15:45:00Z",
  },
  {
    id: "AI-SOL-083",
    title: "Pressure Valve Misreporting Readings",
    description:
      "AI-generated steps to troubleshoot the issue: pressure valve misreporting readings.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.79,
    usageCount: 12,
    lastUsed: "6 hours ago",
    tags: ["alarm", "temperature", "sensor"],
    links: [
      {
        title: "Guide for Pressure Valve Misreporting Readings",
        url: "https://docs.industrial.support/solution/ai-sol-83/guide",
      },
      {
        title: "FAQ for Pressure Valve Misreporting Readings",
        url: "https://docs.internal/faq/ai-sol-83",
      },
    ],
    documents: [
      {
        name: "Pressure Valve Misreporting Readings Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Pressure Valve Misreporting Readings Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T15:30:00Z",
  },
  {
    id: "AI-SOL-084",
    title: "Firmware Update Failure on Controller",
    description:
      "AI-generated steps to troubleshoot the issue: firmware update failure on controller.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.95,
    usageCount: 10,
    lastUsed: "7 hours ago",
    tags: ["alarm", "firmware", "sensor"],
    links: [
      {
        title: "Guide for Firmware Update Failure on Controller",
        url: "https://docs.industrial.support/solution/ai-sol-84/guide",
      },
      {
        title: "FAQ for Firmware Update Failure on Controller",
        url: "https://docs.internal/faq/ai-sol-84",
      },
    ],
    documents: [
      {
        name: "Firmware Update Failure on Controller Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Firmware Update Failure on Controller Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T15:15:00Z",
  },
  {
    id: "AI-SOL-085",
    title: "Relay Module Not Engaging",
    description: "AI-generated steps to troubleshoot the issue: relay module not engaging.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.91,
    usageCount: 4,
    lastUsed: "2 hours ago",
    tags: ["relay", "pressure", "temperature"],
    links: [
      {
        title: "Guide for Relay Module Not Engaging",
        url: "https://docs.industrial.support/solution/ai-sol-85/guide",
      },
      {
        title: "FAQ for Relay Module Not Engaging",
        url: "https://docs.internal/faq/ai-sol-85",
      },
    ],
    documents: [
      {
        name: "Relay Module Not Engaging Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Relay Module Not Engaging Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T15:00:00Z",
  },
  {
    id: "AI-SOL-086",
    title: "Overvoltage Detected in Control Cabinet",
    description:
      "AI-generated steps to troubleshoot the issue: overvoltage detected in control cabinet.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.95,
    usageCount: 16,
    lastUsed: "3 hours ago",
    tags: ["controller", "network", "sensor"],
    links: [
      {
        title: "Guide for Overvoltage Detected in Control Cabinet",
        url: "https://docs.industrial.support/solution/ai-sol-86/guide",
      },
      {
        title: "FAQ for Overvoltage Detected in Control Cabinet",
        url: "https://docs.internal/faq/ai-sol-86",
      },
    ],
    documents: [
      {
        name: "Overvoltage Detected in Control Cabinet Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Overvoltage Detected in Control Cabinet Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T14:45:00Z",
  },
  {
    id: "AI-SOL-087",
    title: "Analog Signal Clipping at ADC Input",
    description:
      "AI-generated steps to troubleshoot the issue: analog signal clipping at adc input.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.81,
    usageCount: 21,
    lastUsed: "9 hours ago",
    tags: ["network", "relay", "firmware"],
    links: [
      {
        title: "Guide for Analog Signal Clipping at ADC Input",
        url: "https://docs.industrial.support/solution/ai-sol-87/guide",
      },
      {
        title: "FAQ for Analog Signal Clipping at ADC Input",
        url: "https://docs.internal/faq/ai-sol-87",
      },
    ],
    documents: [
      {
        name: "Analog Signal Clipping at ADC Input Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Analog Signal Clipping at ADC Input Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T14:30:00Z",
  },
  {
    id: "AI-SOL-088",
    title: "Inverter Module Communication Timeout",
    description:
      "AI-generated steps to troubleshoot the issue: inverter module communication timeout.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.9,
    usageCount: 25,
    lastUsed: "6 hours ago",
    tags: ["calibration", "temperature", "firmware"],
    links: [
      {
        title: "Guide for Inverter Module Communication Timeout",
        url: "https://docs.industrial.support/solution/ai-sol-88/guide",
      },
      {
        title: "FAQ for Inverter Module Communication Timeout",
        url: "https://docs.internal/faq/ai-sol-88",
      },
    ],
    documents: [
      {
        name: "Inverter Module Communication Timeout Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inverter Module Communication Timeout Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T14:15:00Z",
  },
  {
    id: "AI-SOL-089",
    title: "Sudden Drop in Production Line Speed",
    description:
      "AI-generated steps to troubleshoot the issue: sudden drop in production line speed.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.96,
    usageCount: 19,
    lastUsed: "6 hours ago",
    tags: ["controller", "plc", "alarm"],
    links: [
      {
        title: "Guide for Sudden Drop in Production Line Speed",
        url: "https://docs.industrial.support/solution/ai-sol-89/guide",
      },
      {
        title: "FAQ for Sudden Drop in Production Line Speed",
        url: "https://docs.internal/faq/ai-sol-89",
      },
    ],
    documents: [
      {
        name: "Sudden Drop in Production Line Speed Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Sudden Drop in Production Line Speed Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T14:00:00Z",
  },
  {
    id: "AI-SOL-090",
    title: "PID Loop Oscillations in Temperature Control",
    description:
      "AI-generated steps to troubleshoot the issue: pid loop oscillations in temperature control.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.88,
    usageCount: 16,
    lastUsed: "1 hours ago",
    tags: ["plc", "calibration", "motor"],
    links: [
      {
        title: "Guide for PID Loop Oscillations in Temperature Control",
        url: "https://docs.industrial.support/solution/ai-sol-90/guide",
      },
      {
        title: "FAQ for PID Loop Oscillations in Temperature Control",
        url: "https://docs.internal/faq/ai-sol-90",
      },
    ],
    documents: [
      {
        name: "PID Loop Oscillations in Temperature Control Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PID Loop Oscillations in Temperature Control Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T13:45:00Z",
  },
  {
    id: "AI-SOL-091",
    title: "Stepper Motor Stalling at High Speeds",
    description:
      "AI-generated steps to troubleshoot the issue: stepper motor stalling at high speeds.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.8,
    usageCount: 17,
    lastUsed: "2 hours ago",
    tags: ["sensor", "vibration", "communication"],
    links: [
      {
        title: "Guide for Stepper Motor Stalling at High Speeds",
        url: "https://docs.industrial.support/solution/ai-sol-91/guide",
      },
      {
        title: "FAQ for Stepper Motor Stalling at High Speeds",
        url: "https://docs.internal/faq/ai-sol-91",
      },
    ],
    documents: [
      {
        name: "Stepper Motor Stalling at High Speeds Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Stepper Motor Stalling at High Speeds Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T13:30:00Z",
  },
  {
    id: "AI-SOL-092",
    title: "Inconsistent Temperature Sensor Output",
    description:
      "AI-generated steps to troubleshoot the issue: inconsistent temperature sensor output.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.87,
    usageCount: 19,
    lastUsed: "7 hours ago",
    tags: ["hydraulic", "pressure", "network"],
    links: [
      {
        title: "Guide for Inconsistent Temperature Sensor Output",
        url: "https://docs.industrial.support/solution/ai-sol-92/guide",
      },
      {
        title: "FAQ for Inconsistent Temperature Sensor Output",
        url: "https://docs.internal/faq/ai-sol-92",
      },
    ],
    documents: [
      {
        name: "Inconsistent Temperature Sensor Output Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Inconsistent Temperature Sensor Output Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T13:15:00Z",
  },
  {
    id: "AI-SOL-093",
    title: "Hydraulic Pump Fails to Start",
    description: "AI-generated steps to troubleshoot the issue: hydraulic pump fails to start.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.89,
    usageCount: 25,
    lastUsed: "4 hours ago",
    tags: ["network", "calibration", "hydraulic"],
    links: [
      {
        title: "Guide for Hydraulic Pump Fails to Start",
        url: "https://docs.industrial.support/solution/ai-sol-93/guide",
      },
      {
        title: "FAQ for Hydraulic Pump Fails to Start",
        url: "https://docs.internal/faq/ai-sol-93",
      },
    ],
    documents: [
      {
        name: "Hydraulic Pump Fails to Start Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Hydraulic Pump Fails to Start Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T13:00:00Z",
  },
  {
    id: "AI-SOL-094",
    title: "Vibration Levels Exceeding Threshold",
    description:
      "AI-generated steps to troubleshoot the issue: vibration levels exceeding threshold.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.78,
    usageCount: 18,
    lastUsed: "1 hours ago",
    tags: ["sensor", "plc", "controller"],
    links: [
      {
        title: "Guide for Vibration Levels Exceeding Threshold",
        url: "https://docs.industrial.support/solution/ai-sol-94/guide",
      },
      {
        title: "FAQ for Vibration Levels Exceeding Threshold",
        url: "https://docs.internal/faq/ai-sol-94",
      },
    ],
    documents: [
      {
        name: "Vibration Levels Exceeding Threshold Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Vibration Levels Exceeding Threshold Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T12:45:00Z",
  },
  {
    id: "AI-SOL-095",
    title: "PLC Not Recognizing Input Module",
    description: "AI-generated steps to troubleshoot the issue: plc not recognizing input module.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
      "6. Verify firmware version compatibility",
    ],
    verified: false,
    confidence: 0.89,
    usageCount: 9,
    lastUsed: "2 hours ago",
    tags: ["pressure", "calibration", "motor"],
    links: [
      {
        title: "Guide for PLC Not Recognizing Input Module",
        url: "https://docs.industrial.support/solution/ai-sol-95/guide",
      },
      {
        title: "FAQ for PLC Not Recognizing Input Module",
        url: "https://docs.internal/faq/ai-sol-95",
      },
    ],
    documents: [
      {
        name: "PLC Not Recognizing Input Module Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "PLC Not Recognizing Input Module Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T12:30:00Z",
  },
  {
    id: "AI-SOL-096",
    title: "Slow Network Response from Control System",
    description:
      "AI-generated steps to troubleshoot the issue: slow network response from control system.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.84,
    usageCount: 7,
    lastUsed: "4 hours ago",
    tags: ["motor", "plc", "sensor"],
    links: [
      {
        title: "Guide for Slow Network Response from Control System",
        url: "https://docs.industrial.support/solution/ai-sol-96/guide",
      },
      {
        title: "FAQ for Slow Network Response from Control System",
        url: "https://docs.internal/faq/ai-sol-96",
      },
    ],
    documents: [
      {
        name: "Slow Network Response from Control System Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Slow Network Response from Control System Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T12:15:00Z",
  },
  {
    id: "AI-SOL-097",
    title: "Unexpected Alarm on Cooling Fan",
    description: "AI-generated steps to troubleshoot the issue: unexpected alarm on cooling fan.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.93,
    usageCount: 3,
    lastUsed: "7 hours ago",
    tags: ["relay", "calibration", "motor"],
    links: [
      {
        title: "Guide for Unexpected Alarm on Cooling Fan",
        url: "https://docs.industrial.support/solution/ai-sol-97/guide",
      },
      {
        title: "FAQ for Unexpected Alarm on Cooling Fan",
        url: "https://docs.internal/faq/ai-sol-97",
      },
    ],
    documents: [
      {
        name: "Unexpected Alarm on Cooling Fan Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Unexpected Alarm on Cooling Fan Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T12:00:00Z",
  },
  {
    id: "AI-SOL-098",
    title: "Pressure Valve Misreporting Readings",
    description:
      "AI-generated steps to troubleshoot the issue: pressure valve misreporting readings.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.94,
    usageCount: 23,
    lastUsed: "5 hours ago",
    tags: ["calibration", "network", "vibration"],
    links: [
      {
        title: "Guide for Pressure Valve Misreporting Readings",
        url: "https://docs.industrial.support/solution/ai-sol-98/guide",
      },
      {
        title: "FAQ for Pressure Valve Misreporting Readings",
        url: "https://docs.internal/faq/ai-sol-98",
      },
    ],
    documents: [
      {
        name: "Pressure Valve Misreporting Readings Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Pressure Valve Misreporting Readings Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T11:45:00Z",
  },
  {
    id: "AI-SOL-099",
    title: "Firmware Update Failure on Controller",
    description:
      "AI-generated steps to troubleshoot the issue: firmware update failure on controller.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
      "5. Validate sensor readings against reference instruments",
    ],
    verified: false,
    confidence: 0.9,
    usageCount: 25,
    lastUsed: "1 hours ago",
    tags: ["motor", "relay", "alarm"],
    links: [
      {
        title: "Guide for Firmware Update Failure on Controller",
        url: "https://docs.industrial.support/solution/ai-sol-99/guide",
      },
      {
        title: "FAQ for Firmware Update Failure on Controller",
        url: "https://docs.internal/faq/ai-sol-99",
      },
    ],
    documents: [
      {
        name: "Firmware Update Failure on Controller Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Firmware Update Failure on Controller Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T11:30:00Z",
  },
  {
    id: "AI-SOL-100",
    title: "Relay Module Not Engaging",
    description: "AI-generated steps to troubleshoot the issue: relay module not engaging.",
    steps: [
      "1. Inspect connections and tighten loose terminals",
      "2. Review error logs from the control system",
      "3. Power cycle affected hardware",
      "4. Check for environmental causes like temperature or EMI",
    ],
    verified: false,
    confidence: 0.87,
    usageCount: 19,
    lastUsed: "10 hours ago",
    tags: ["temperature", "hydraulic", "relay"],
    links: [
      {
        title: "Guide for Relay Module Not Engaging",
        url: "https://docs.industrial.support/solution/ai-sol-100/guide",
      },
      {
        title: "FAQ for Relay Module Not Engaging",
        url: "https://docs.internal/faq/ai-sol-100",
      },
    ],
    documents: [
      {
        name: "Relay Module Not Engaging Troubleshooting.pdf",
        type: "pdf",
      },
      {
        name: "Relay Module Not Engaging Configuration.json",
        type: "json",
      },
    ],
    createdAt: "2024-05-23T11:15:00Z",
  },
];

export const aiDisclaimer =
  "This solution was generated by AI based on common troubleshooting patterns. Please verify with technical documentation.";
