import { useState } from "react";

const workoutPlan = [
  {
    day: "Day 1",
    focus: "Push (Chest, Shoulders, Triceps)",
    color: "#FF6B35",
    exercises: [
      { name: "Push-ups (Wide)", sets: 4, reps: "12–15", note: "Chest focus" },
      { name: "Diamond Push-ups", sets: 3, reps: "10–12", note: "Triceps" },
      { name: "Pike Push-ups", sets: 3, reps: "10–12", note: "Shoulders" },
      { name: "Decline Push-ups", sets: 3, reps: "10–12", note: "Upper chest" },
      { name: "Tricep Dips (chair)", sets: 3, reps: "12–15", note: "" },
      { name: "Plank Hold", sets: 3, reps: "45 sec", note: "" },
    ],
  },
  {
    day: "Day 2",
    focus: "Pull (Back, Biceps)",
    color: "#2EC4B6",
    exercises: [
      { name: "Pull-ups / Chin-ups", sets: 4, reps: "6–10", note: "Use band if needed" },
      { name: "Inverted Rows", sets: 3, reps: "10–12", note: "Table/bar" },
      { name: "Australian Pull-ups", sets: 3, reps: "12–15", note: "" },
      { name: "Superman Hold", sets: 3, reps: "12 reps", note: "Lower back" },
      { name: "Towel Bicep Curl", sets: 3, reps: "12–15", note: "With bag" },
      { name: "Dead Hang", sets: 3, reps: "30 sec", note: "Grip & decompression" },
    ],
  },
  {
    day: "Day 3",
    focus: "Legs & Glutes",
    color: "#9B5DE5",
    exercises: [
      { name: "Bodyweight Squats", sets: 4, reps: "20", note: "" },
      { name: "Bulgarian Split Squats", sets: 3, reps: "12 each", note: "Balance focus" },
      { name: "Jump Squats", sets: 3, reps: "15", note: "Explosive" },
      { name: "Glute Bridges", sets: 4, reps: "20", note: "" },
      { name: "Reverse Lunges", sets: 3, reps: "12 each", note: "" },
      { name: "Calf Raises", sets: 4, reps: "25", note: "" },
    ],
  },
  {
    day: "Day 4",
    focus: "Core & Cardio Burn",
    color: "#F15BB5",
    exercises: [
      { name: "Burpees", sets: 4, reps: "15", note: "Full body burn" },
      { name: "Mountain Climbers", sets: 3, reps: "30 sec", note: "" },
      { name: "Bicycle Crunches", sets: 3, reps: "20 each", note: "" },
      { name: "Leg Raises", sets: 3, reps: "15", note: "" },
      { name: "Russian Twists", sets: 3, reps: "20 each", note: "" },
      { name: "High Knees", sets: 4, reps: "45 sec", note: "" },
    ],
  },
  {
    day: "Day 5",
    focus: "Full Body Strength",
    color: "#00BBF9",
    exercises: [
      { name: "Archer Push-ups", sets: 3, reps: "8 each", note: "Advanced push" },
      { name: "Pull-ups", sets: 4, reps: "6–10", note: "" },
      { name: "Pistol Squat (assisted)", sets: 3, reps: "6 each", note: "" },
      { name: "Dip (parallel bars/chairs)", sets: 3, reps: "10–12", note: "" },
      { name: "L-Sit Hold (floor)", sets: 3, reps: "15–20 sec", note: "" },
      { name: "Hollow Body Hold", sets: 3, reps: "30 sec", note: "" },
    ],
  },
  {
    day: "Day 6",
    focus: "HIIT + Mobility",
    color: "#00F5D4",
    exercises: [
      { name: "Jump Rope / Jumping Jacks", sets: 1, reps: "5 min warm-up", note: "" },
      { name: "Tabata Squats", sets: 4, reps: "20 sec on/10 off", note: "" },
      { name: "Tabata Push-ups", sets: 4, reps: "20 sec on/10 off", note: "" },
      { name: "Inchworm Stretch", sets: 3, reps: "10", note: "Mobility" },
      { name: "Hip Flexor Stretch", sets: 2, reps: "45 sec each", note: "" },
      { name: "Child's Pose + Thread the Needle", sets: 2, reps: "60 sec", note: "Recovery" },
    ],
  },
];

const dietPlan = [
  {
    meal: "Early Morning",
    time: "6:00 AM",
    icon: "🌅",
    items: ["Warm water with lemon", "5–6 soaked almonds", "1 tsp fenugreek seeds soaked overnight (optional)"],
  },
  {
    meal: "Breakfast",
    time: "7:30–8:00 AM",
    icon: "🍽️",
    items: [
      "Option A: 2 Egg white omelette + 2 Idli with sambar (no coconut chutney)",
      "Option B: Ragi dosa (2) + tomato chutney + 1 boiled egg",
      "Option C: Oats upma with veggies + 1 cup low-fat curd",
    ],
  },
  {
    meal: "Mid-Morning Snack",
    time: "10:30 AM",
    icon: "🍌",
    items: ["1 medium banana OR 1 cup papaya", "1 cup buttermilk (neer mor) — no sugar, light salt + jeera"],
  },
  {
    meal: "Lunch",
    time: "1:00 PM",
    icon: "🌿",
    items: [
      "2 small cups brown rice or 1 cup white rice (measured)",
      "1 bowl sambar (loaded with veggies — drumstick, tomato, brinjal)",
      "1 portion grilled/baked chicken OR fish curry (2 pieces) OR 1 cup rajma/chana",
      "1 cup rasam",
      "1 cup curd (low fat)",
      "Salad: cucumber + onion + lemon",
    ],
  },
  {
    meal: "Evening Snack",
    time: "4:00–4:30 PM",
    icon: "☕",
    items: [
      "1 cup green tea or black coffee (no sugar)",
      "Option A: Roasted chana (handful)",
      "Option B: 1 boiled egg + cucumber slices",
      "Option C: Sprouts chaat (small bowl)",
    ],
  },
  {
    meal: "Dinner",
    time: "7:00–7:30 PM",
    icon: "🌙",
    items: [
      "2 Jowar/Ragi rotis OR 1 small cup millet rice",
      "1 bowl kootu (cabbage/raw banana/yam with dal)",
      "Grilled fish / egg curry / paneer curry (small portion)",
      "Clear vegetable soup",
      "No rice at dinner if you had rice at lunch",
    ],
  },
  {
    meal: "Post-Dinner",
    time: "9:00 PM",
    icon: "🌛",
    items: ["1 cup warm turmeric milk (low fat, no sugar) OR herbal tea", "Avoid food after 9 PM"],
  },
];

const tips = [
  "💧 Drink 3–4 litres of water daily",
  "🚶 Walk 8,000–10,000 steps even on rest day",
  "🛌 Sleep 7–8 hours — critical for fat loss",
  "🍚 Keep rice portions small (half cup measured cooked)",
  "🌶️ Use minimal oil — prefer coconut oil or ghee in small amounts",
  "⏰ Eat dinner before 8 PM",
];

export default function FitnessPlan() {
  const [activeTab, setActiveTab] = useState("workout");
  const [expandedDay, setExpandedDay] = useState(0);
  const [expandedMeal, setExpandedMeal] = useState(null);

  return (
    <div style={{
      fontFamily: "'Georgia', serif",
      background: "#0D0D0D",
      minHeight: "100vh",
      color: "#F0EDE8",
      padding: "0 0 60px",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #111 100%)",
        borderBottom: "1px solid #2a2a2a",
        padding: "28px 20px 0",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: "#FF6B35", textTransform: "uppercase", marginBottom: 8 }}>
          Personalised Plan
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 4px", letterSpacing: -0.5 }}>
          Calisthenics × South Indian
        </h1>
        <p style={{ fontSize: 13, color: "#888", margin: "0 0 20px" }}>
          6-Day Fat Loss Program · Intermediate Level
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 0, borderBottom: "1px solid #222" }}>
          {["workout", "diet", "tips"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "none",
                border: "none",
                padding: "10px 24px",
                fontSize: 13,
                fontFamily: "Georgia, serif",
                cursor: "pointer",
                color: activeTab === tab ? "#FF6B35" : "#666",
                borderBottom: activeTab === tab ? "2px solid #FF6B35" : "2px solid transparent",
                textTransform: "capitalize",
                letterSpacing: 1,
                transition: "all 0.2s",
                marginBottom: -1,
              }}
            >
              {tab === "workout" ? "💪 Workout" : tab === "diet" ? "🍛 Diet" : "✅ Tips"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 16px 0" }}>

        {/* WORKOUT TAB */}
        {activeTab === "workout" && (
          <div>
            <p style={{ fontSize: 12, color: "#666", textAlign: "center", marginBottom: 20, letterSpacing: 0.5 }}>
              Day 7 = Full Rest · Stretch & Walk Only
            </p>
            {workoutPlan.map((day, i) => (
              <div
                key={i}
                style={{
                  background: "#141414",
                  border: `1px solid ${expandedDay === i ? day.color + "55" : "#222"}`,
                  borderRadius: 12,
                  marginBottom: 10,
                  overflow: "hidden",
                  transition: "border-color 0.3s",
                }}
              >
                <button
                  onClick={() => setExpandedDay(expandedDay === i ? null : i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: day.color + "22",
                      border: `1px solid ${day.color}44`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 700, color: day.color,
                      letterSpacing: -0.5,
                    }}>
                      D{i + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#F0EDE8" }}>{day.day}</div>
                      <div style={{ fontSize: 11, color: day.color, marginTop: 1 }}>{day.focus}</div>
                    </div>
                  </div>
                  <span style={{ color: "#555", fontSize: 18, transition: "transform 0.3s", transform: expandedDay === i ? "rotate(180deg)" : "none" }}>
                    ↓
                  </span>
                </button>

                {expandedDay === i && (
                  <div style={{ padding: "0 16px 16px" }}>
                    <div style={{ height: 1, background: "#222", marginBottom: 14 }} />
                    {day.exercises.map((ex, j) => (
                      <div key={j} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 0",
                        borderBottom: j < day.exercises.length - 1 ? "1px solid #1e1e1e" : "none",
                      }}>
                        <div>
                          <div style={{ fontSize: 13, color: "#E8E5E0" }}>{ex.name}</div>
                          {ex.note && <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{ex.note}</div>}
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                          <span style={{
                            fontSize: 11,
                            background: day.color + "22",
                            color: day.color,
                            padding: "3px 8px",
                            borderRadius: 4,
                            display: "block",
                            marginBottom: 3,
                          }}>
                            {ex.sets} sets
                          </span>
                          <span style={{ fontSize: 11, color: "#666" }}>{ex.reps}</span>
                        </div>
                      </div>
                    ))}
                    <div style={{
                      marginTop: 14, padding: "10px 12px",
                      background: "#1a1a1a", borderRadius: 8,
                      fontSize: 11, color: "#666",
                    }}>
                      ⏱ Rest 60–90 sec between sets · Warm up 5 min before starting
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* DIET TAB */}
        {activeTab === "diet" && (
          <div>
            <div style={{
              background: "#141414",
              border: "1px solid #222",
              borderRadius: 10,
              padding: "12px 14px",
              marginBottom: 16,
              fontSize: 12,
              color: "#888",
              lineHeight: 1.7,
            }}>
              🎯 <strong style={{ color: "#FF6B35" }}>Target:</strong> ~1,700–1,900 kcal/day · High protein · Low refined carbs · Traditional South Indian foods
            </div>

            {dietPlan.map((meal, i) => (
              <div
                key={i}
                style={{
                  background: "#141414",
                  border: `1px solid ${expandedMeal === i ? "#FF6B3555" : "#222"}`,
                  borderRadius: 12,
                  marginBottom: 10,
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setExpandedMeal(expandedMeal === i ? null : i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 22 }}>{meal.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#F0EDE8" }}>{meal.meal}</div>
                      <div style={{ fontSize: 11, color: "#FF6B35", marginTop: 1 }}>{meal.time}</div>
                    </div>
                  </div>
                  <span style={{ color: "#555", fontSize: 18, transition: "transform 0.3s", transform: expandedMeal === i ? "rotate(180deg)" : "none" }}>↓</span>
                </button>

                {expandedMeal === i && (
                  <div style={{ padding: "0 16px 16px" }}>
                    <div style={{ height: 1, background: "#222", marginBottom: 12 }} />
                    {meal.items.map((item, j) => (
                      <div key={j} style={{
                        padding: "8px 0",
                        borderBottom: j < meal.items.length - 1 ? "1px solid #1e1e1e" : "none",
                        fontSize: 13, color: "#C8C4BE",
                        lineHeight: 1.5,
                        display: "flex", gap: 8,
                      }}>
                        <span style={{ color: "#FF6B35", flexShrink: 0, marginTop: 1 }}>·</span>
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TIPS TAB */}
        {activeTab === "tips" && (
          <div>
            <div style={{
              background: "#141414",
              border: "1px solid #222",
              borderRadius: 12,
              padding: "20px 16px",
              marginBottom: 16,
            }}>
              <div style={{ fontSize: 12, color: "#FF6B35", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
                Daily Habits
              </div>
              {tips.map((tip, i) => (
                <div key={i} style={{
                  padding: "12px 0",
                  borderBottom: i < tips.length - 1 ? "1px solid #1e1e1e" : "none",
                  fontSize: 13, color: "#C8C4BE", lineHeight: 1.6,
                }}>
                  {tip}
                </div>
              ))}
            </div>

            <div style={{
              background: "#141414",
              border: "1px solid #222",
              borderRadius: 12,
              padding: "20px 16px",
              marginBottom: 16,
            }}>
              <div style={{ fontSize: 12, color: "#2EC4B6", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
                Foods to Avoid
              </div>
              {["White bread, maida-based items (parotta, puri daily)", "Sugary drinks, packaged juices, sodas", "Fried snacks — murukku, bajji, bonda (daily)", "Excess rice at night", "Full-fat coconut milk in large quantities", "Late-night eating after 9 PM"].map((f, i, arr) => (
                <div key={i} style={{
                  padding: "10px 0",
                  borderBottom: i < arr.length - 1 ? "1px solid #1e1e1e" : "none",
                  fontSize: 13, color: "#C8C4BE",
                  display: "flex", gap: 8,
                }}>
                  <span style={{ color: "#e05", flexShrink: 0 }}>✕</span> {f}
                </div>
              ))}
            </div>

            <div style={{
              background: "linear-gradient(135deg, #FF6B3511, #FF6B3505)",
              border: "1px solid #FF6B3533",
              borderRadius: 12,
              padding: "18px 16px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>🎯</div>
              <div style={{ fontSize: 13, color: "#FF6B35", fontWeight: 600, marginBottom: 6 }}>
                Your First Goal
              </div>
              <div style={{ fontSize: 12, color: "#888", lineHeight: 1.7 }}>
                Reduce from <strong style={{ color: "#F0EDE8" }}>29%</strong> to under <strong style={{ color: "#F0EDE8" }}>25%</strong> body fat<br />
                Estimated time: <strong style={{ color: "#FF6B35" }}>3–4 months</strong> with consistent effort
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
