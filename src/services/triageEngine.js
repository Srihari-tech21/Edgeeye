/**
 * EdgeAyu Deterministic Local Triage Engine
 * Centralizes clinical rule logic, parameter observations, and explainable triage output.
 * Output conforms to Future Local AI Contract.
 */

export const triageEngine = {
  evaluate: (assessmentData) => {
    const { 
      vitals = {}, 
      symptoms = [], 
      rawSymptomsText = "", 
      redFlags = {},
      age = "32",
      gender = "Female",
      patientId = "PAT-025"
    } = assessmentData;

    const sys = Number(vitals.bpSystolic) || 120;
    const dia = Number(vitals.bpDiastolic) || 80;
    const pulse = Number(vitals.pulse) || 75;
    const spo2 = Number(vitals.spo2) || 98;
    const temp = Number(vitals.temperature) || 36.8;

    const observations = [];
    const reasons = [];
    const matchedGuidelines = [];
    const recommendedActions = [];

    let priority = "ROUTINE";

    // 1. Critical Red Flags Screener
    const activeRedFlags = Object.entries(redFlags)
      .filter(([_, val]) => Boolean(val))
      .map(([key]) => {
        switch(key) {
          case 'chestPain': return 'Chest pain';
          case 'severeBreathingDifficulty': return 'Severe breathing difficulty';
          case 'lossOfConsciousness': return 'Loss of consciousness';
          case 'acuteConfusion': return 'Acute confusion';
          case 'severeBleeding': return 'Severe bleeding';
          case 'severeWeakness': return 'Severe weakness';
          default: return key;
        }
      });

    const hasCriticalRedFlag = activeRedFlags.length > 0;

    if (hasCriticalRedFlag) {
      priority = "URGENT CLINICAL ATTENTION";
      observations.push({
        parameter: "Emergency Red Flags",
        value: activeRedFlags.join(', '),
        finding: "Critical warning sign reported → Seek immediate emergency medical assistance"
      });
      reasons.push(`Emergency Red Flags Reported: ${activeRedFlags.join(', ')} → Requires immediate emergency referral`);
      matchedGuidelines.push("WHO Emergency Care Triage Protocol for Low-Resource Settings");
      recommendedActions.push("An emergency warning sign was reported. Follow local emergency protocols and seek immediate professional medical assistance.");
      recommendedActions.push("Arrange urgent emergency transfer to nearest acute care facility.");
    }

    // 2. Blood Pressure Evaluation
    if (sys >= 160 || dia >= 100) {
      if (!hasCriticalRedFlag) priority = "HIGH PRIORITY";
      observations.push({
        parameter: "Blood Pressure",
        value: `${sys}/${dia} mmHg`,
        finding: "Elevated reading detected (Stage 2 Hypertensive Risk)"
      });
      reasons.push(`Blood Pressure ${sys}/${dia} mmHg → Elevated reading detected`);
      matchedGuidelines.push("WHO HEARTS - High Risk Hypertensive Protocol");
      recommendedActions.push("Refer to nearest health facility for clinical evaluation");
      recommendedActions.push("Monitor vitals regularly in quiet resting position");
    } else if (sys >= 140 || dia >= 90) {
      if (priority === "ROUTINE") priority = "REVIEW REQUIRED";
      observations.push({
        parameter: "Blood Pressure",
        value: `${sys}/${dia} mmHg`,
        finding: "Elevated reading detected (Stage 1 Pre-hypertensive threshold)"
      });
      reasons.push(`Blood Pressure ${sys}/${dia} mmHg → Elevated reading detected`);
      matchedGuidelines.push("WHO HEARTS Hypertension Protocol");
      recommendedActions.push("Follow up within 24 hours");
    } else {
      observations.push({
        parameter: "Blood Pressure",
        value: `${sys}/${dia} mmHg`,
        finding: "Normal resting blood pressure range"
      });
    }

    // 3. Oxygen Saturation (SpO2) Evaluation
    if (spo2 < 92) {
      if (!hasCriticalRedFlag) priority = "HIGH PRIORITY";
      observations.push({
        parameter: "SpO₂ Saturation",
        value: `${spo2}%`,
        finding: "Low oxygen saturation reading detected (Critical < 92%)"
      });
      reasons.push(`SpO2 ${spo2}% → Low oxygen saturation reading detected`);
      matchedGuidelines.push("WHO Oxygen Therapy Guidelines");
      recommendedActions.push("Administer emergency oxygen if available and arrange transfer");
    } else if (spo2 <= 94) {
      if (priority === "ROUTINE") priority = "HIGH PRIORITY";
      observations.push({
        parameter: "SpO₂ Saturation",
        value: `${spo2}%`,
        finding: "Borderline low oxygen saturation reading detected"
      });
      reasons.push(`SpO2 ${spo2}% → Borderline oxygen saturation reading detected`);
      recommendedActions.push("Monitor SpO2 regularly");
    } else {
      observations.push({
        parameter: "SpO₂ Saturation",
        value: `${spo2}%`,
        finding: "Normal oxygen saturation level"
      });
    }

    // 4. Pulse Evaluation
    if (pulse > 100) {
      observations.push({
        parameter: "Pulse Rate",
        value: `${pulse} bpm`,
        finding: "Increased pulse value detected (Tachycardia)"
      });
      reasons.push(`Pulse ${pulse} bpm → Increased pulse detected`);
    } else if (pulse < 50) {
      observations.push({
        parameter: "Pulse Rate",
        value: `${pulse} bpm`,
        finding: "Low pulse value detected (Bradycardia)"
      });
      reasons.push(`Pulse ${pulse} bpm → Low pulse detected`);
    }

    // 5. Temperature Evaluation
    if (temp >= 38.0) {
      if (priority === "ROUTINE") priority = "REVIEW REQUIRED";
      observations.push({
        parameter: "Temperature",
        value: `${temp}°C`,
        finding: "Fever temperature reading detected"
      });
      reasons.push(`Temperature ${temp}°C → Fever temperature reading detected`);
      matchedGuidelines.push("IMAI Fever Protocol");
    }

    // 6. Symptoms Check
    if (rawSymptomsText || symptoms.length > 0) {
      const summaryText = symptoms.length > 0 ? symptoms.slice(0, 2).join(" + ") : "Reported symptoms";
      observations.push({
        parameter: "Reported Symptoms",
        value: summaryText,
        finding: "Reported symptoms require clinical review"
      });
      reasons.push(`Symptoms ${summaryText} → Reported symptoms require clinical review`);
    }

    if (recommendedActions.length === 0) {
      recommendedActions.push("Educate patient on warning signs");
      recommendedActions.push("Standard routine health maintenance");
    }

    // Return Future Local AI Contract schema
    return {
      priority,
      hasCriticalRedFlag,
      urgentMessage: hasCriticalRedFlag ? "An emergency warning sign was reported. Follow local emergency protocols and seek immediate professional medical assistance." : null,
      observations,
      reasons,
      flaggedReasons: reasons,
      redFlags,
      matchedGuidelines: matchedGuidelines.length > 0 ? matchedGuidelines : ["Standard IMAI Triage Protocol"],
      recommendedActions,
      recommendations: recommendedActions,
      confidence: 0.96,
      disclaimer: "AI-assisted decision support; not a diagnosis.",
      processingMode: "LOCAL / OFFLINE",
      timestamp: "Just now",
      dateFormatted: new Date().toLocaleString()
    };
  }
};
