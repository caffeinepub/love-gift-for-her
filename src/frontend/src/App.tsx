import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// ── Decorative SVG Rose ──────────────────────────────────────────────────────
function RoseDeco({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="40" cy="40" r="18" fill="#F2D9DA" opacity="0.7" />
      <circle cx="40" cy="40" r="10" fill="#C58C8F" opacity="0.5" />
      <ellipse
        cx="22"
        cy="32"
        rx="9"
        ry="6"
        fill="#F2D9DA"
        opacity="0.6"
        transform="rotate(-30 22 32)"
      />
      <ellipse
        cx="58"
        cy="32"
        rx="9"
        ry="6"
        fill="#F2D9DA"
        opacity="0.6"
        transform="rotate(30 58 32)"
      />
      <ellipse cx="40" cy="18" rx="9" ry="6" fill="#EED1D4" opacity="0.6" />
      <ellipse cx="40" cy="62" rx="9" ry="6" fill="#EED1D4" opacity="0.6" />
      <line
        x1="40"
        y1="58"
        x2="40"
        y2="76"
        stroke="#B47A7D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse
        cx="33"
        cy="71"
        rx="7"
        ry="4"
        fill="#C58C8F"
        opacity="0.3"
        transform="rotate(-20 33 71)"
      />
    </svg>
  );
}

function HeartSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 22"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21C12 21 1 13.5 1 7.5C1 4.42 3.42 2 6.5 2C8.24 2 9.81 2.82 11 4.08C12.19 2.82 13.76 2 15.5 2C18.58 2 21 4.42 21 7.5C21 13.5 12 21 12 21Z"
        fill="#C58C8F"
        opacity="0.45"
      />
    </svg>
  );
}

// ── Background Music ─────────────────────────────────────────────────────────
function BackgroundMusic({ playing }: { playing: boolean }) {
  if (!playing) return null;
  return (
    <iframe
      src="https://www.youtube.com/embed/rxaqSsTQeGQ?autoplay=1&loop=1&playlist=rxaqSsTQeGQ&controls=0&showinfo=0&modestbranding=1"
      allow="autoplay"
      style={{ display: "none" }}
      title="background-music"
    />
  );
}

function MusicToggle({
  playing,
  onToggle,
}: { playing: boolean; onToggle: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className="fixed bottom-14 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg text-xl"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.62 0.11 10), oklch(0.52 0.13 350))",
        border: "2px solid oklch(0.85 0.05 355 / 0.6)",
      }}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      title={playing ? "Pause music" : "Play music"}
    >
      {playing ? "🎵" : "🔇"}
    </motion.button>
  );
}

// ── Stepper ──────────────────────────────────────────────────────────────────
const STEPS = [
  { label: "Login", icon: "🔑" },
  { label: "Letter", icon: "💌" },
  { label: "Question", icon: "💍" },
  { label: "Sera", icon: "💕" },
  { label: "Photo", icon: "📸" },
  { label: "2 Months", icon: "🗓️" },
  { label: "100 Reasons", icon: "💯" },
  { label: "Note", icon: "💬" },
  { label: "Always", icon: "💋" },
];

function Stepper({ current }: { current: Step }) {
  return (
    <div className="flex items-center justify-center gap-0.5 mb-8 px-2">
      {STEPS.map((s, i) => {
        const stepNum = (i + 1) as Step;
        const active = stepNum === current;
        const done = stepNum < current;
        return (
          <div key={s.label} className="flex items-center">
            <motion.div
              className="flex flex-col items-center gap-0.5"
              animate={active ? { scale: [1, 1.18, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all duration-300 ${
                  active
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : done
                      ? "bg-secondary text-secondary-foreground border-primary/50"
                      : "bg-card text-muted-foreground border-border"
                }`}
              >
                {done ? "♥" : s.icon}
              </div>
            </motion.div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-px w-2 sm:w-3 mx-0.5 transition-all duration-500 ${done ? "bg-primary/60" : "bg-border"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Background ───────────────────────────────────────────────────────────────
function PageBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, oklch(0.90 0.045 8 / 0.55) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 80% 80%, oklch(0.88 0.05 355 / 0.5) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 50% 50%, oklch(0.97 0.008 60) 0%, oklch(0.955 0.018 40) 100%)",
        }}
      />
      <RoseDeco className="absolute -top-4 -left-4 w-36 h-36 opacity-55" />
      <RoseDeco className="absolute -top-4 -right-4 w-36 h-36 opacity-55 scale-x-[-1]" />
      <RoseDeco className="absolute -bottom-4 -right-4 w-28 h-28 opacity-45" />
      <RoseDeco className="absolute -bottom-4 -left-4 w-24 h-24 opacity-40 scale-x-[-1]" />
      <HeartSVG className="absolute top-1/4 left-3 w-5 h-5 opacity-35" />
      <HeartSVG className="absolute top-1/2 left-5 w-4 h-4 opacity-25" />
      <HeartSVG className="absolute top-3/4 left-2 w-6 h-6 opacity-20" />
      <HeartSVG className="absolute top-1/3 right-3 w-5 h-5 opacity-35" />
      <HeartSVG className="absolute top-2/3 right-5 w-4 h-4 opacity-25" />
    </div>
  );
}

function FloatingPetals() {
  const petals = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${3 + ((i * 6.2) % 92)}%`,
    delay: `${(i * 0.6) % 8}s`,
    duration: `${6 + ((i * 0.5) % 5)}s`,
    size: `${1.0 + ((i * 0.12) % 0.9)}rem`,
    emoji: ["🌸", "🌹", "✨", "💫", "🌺", "💐"][i % 6],
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((p) => (
        <span
          key={p.id}
          className="float-petal"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            fontSize: p.size,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

function FloatingHearts() {
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${5 + ((i * 5.5) % 90)}%`,
    delay: `${(i * 0.35) % 4}s`,
    duration: `${3 + ((i * 0.4) % 3)}s`,
    size: `${1.2 + ((i * 0.15) % 1.2)}rem`,
    emoji: ["💋", "❤️", "💕", "💖", "💗", "💝", "🌹", "✨"][i % 8],
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="float-heart"
          style={{
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.duration,
            fontSize: h.size,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

function Flourish() {
  return (
    <div className="flex items-center gap-2 mb-4 opacity-60">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary/40" />
      <span className="text-primary text-lg">❧</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary/40" />
    </div>
  );
}

function LoveCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="gradient-border shadow-romantic w-full max-w-lg mx-auto">
      <div className="relative bg-card rounded-2xl px-6 py-8 sm:px-10 sm:py-10 overflow-hidden">
        <HeartSVG className="absolute top-3 right-4 w-5 h-5 opacity-25" />
        <HeartSVG className="absolute bottom-3 left-4 w-4 h-4 opacity-20" />
        {children}
      </div>
    </div>
  );
}

function RomanticButton({
  onClick,
  children,
  dataOcid,
}: { onClick?: () => void; children: React.ReactNode; dataOcid?: string }) {
  return (
    <button
      type="button"
      data-ocid={dataOcid}
      onClick={onClick}
      className="btn-romantic w-full py-3.5 px-6 rounded-full text-base font-semibold font-lato text-primary-foreground relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.62 0.11 10), oklch(0.52 0.13 350), oklch(0.62 0.11 10))",
        backgroundSize: "200% auto",
      }}
    >
      {children}
    </button>
  );
}

// ── Step 1 – Login ───────────────────────────────────────────────────────────
function StepLogin({ onUnlock }: { onUnlock: () => void }) {
  const [key, setKey] = useState("");
  const [error, setError] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  const handleSubmit = () => {
    if (key === "thejassera") {
      setUnlocking(true);
      setTimeout(() => onUnlock(), 700);
    } else {
      setError(true);
    }
  };

  return (
    <LoveCard>
      <div className="text-center mb-8">
        <motion.div
          className={`text-5xl mb-4 inline-block ${unlocking ? "animate-unlock-bounce" : "animate-heart-pulse"}`}
          animate={
            unlocking
              ? { scale: [1, 1.5, 0.8, 1.3, 1], rotate: [0, -15, 15, -8, 0] }
              : {}
          }
          transition={{ duration: 0.7 }}
        >
          {unlocking ? "💖" : "🔐"}
        </motion.div>
        <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-foreground">
          Enter the Special Key
        </h1>
        <p className="text-muted-foreground text-sm mt-2 font-lato">
          Only the right key opens this heart 💕
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          data-ocid="login.input"
          type="password"
          placeholder="Enter the secret key..."
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
            setError(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="text-center text-base font-lato rounded-full border-border/70 focus:border-primary focus:ring-primary bg-background/60 py-5"
        />
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-destructive text-sm text-center font-lato"
            data-ocid="login.error_state"
          >
            Wrong key, try again 💔
          </motion.p>
        )}
        <RomanticButton dataOcid="login.primary_button" onClick={handleSubmit}>
          Unlock 💕
        </RomanticButton>
      </div>
    </LoveCard>
  );
}

// ── Step 2 – Love Letter ─────────────────────────────────────────────────────
function StepLoveLetter({ onNext }: { onNext: () => void }) {
  return (
    <LoveCard>
      <div className="text-center mb-5">
        <div className="text-4xl mb-3 animate-heart-pulse">💌</div>
        <h1 className="font-dancing text-3xl sm:text-4xl font-bold text-primary">
          Sangueeeyyyy
        </h1>
      </div>
      <Flourish />
      <div className="parchment rounded-xl p-5 mb-6 space-y-1">
        <p className="font-playfair text-base sm:text-lg leading-relaxed text-foreground text-center italic">
          Poneeeyeee I love you so much vavveeeeeee enteee muthh ahhh nii
          chakkraaa ahhh ponnnnnaahhhh shuttumani ahhhh I love youuu kunja
        </p>
      </div>
      <RomanticButton dataOcid="letter.primary_button" onClick={onNext}>
        Next Page 🌸
      </RomanticButton>
    </LoveCard>
  );
}

// ── Step 3 – Marry Me ────────────────────────────────────────────────────────
function StepMarryMe({ onNext }: { onNext: () => void }) {
  const [checked, setChecked] = useState(false);
  const [done, setDone] = useState(false);

  const handleCheck = (val: boolean) => {
    if (val) {
      setChecked(true);
      setDone(true);
      setTimeout(() => onNext(), 1200);
    } else {
      setChecked(false);
    }
  };

  return (
    <LoveCard>
      <div className="text-center mb-6">
        <div className="text-4xl mb-3 animate-heart-pulse">💍</div>
        <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-foreground">
          Will You Marry Me?
        </h1>
        <p className="text-muted-foreground text-sm mt-2 font-lato">
          This is the most important question 💖
        </p>
      </div>
      <div className="parchment rounded-xl p-5 border border-border mb-4">
        <div className="flex items-center gap-4">
          <Checkbox
            data-ocid="marry.checkbox"
            id="marry-checkbox"
            checked={checked}
            onCheckedChange={handleCheck}
            className="w-6 h-6 border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Label
            htmlFor="marry-checkbox"
            className="font-playfair text-base sm:text-lg italic text-foreground cursor-pointer leading-snug"
          >
            By clicking this you have married Me 💖
          </Label>
        </div>
      </div>
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-center mt-4 text-4xl"
            data-ocid="marry.success_state"
          >
            ✨ 💍 ✨
          </motion.div>
        )}
      </AnimatePresence>
    </LoveCard>
  );
}

// ── Step 4 – Sera Letter ─────────────────────────────────────────────────────
function StepSeraLetter({ onNext }: { onNext: () => void }) {
  return (
    <LoveCard>
      <div className="text-center mb-5">
        <div className="text-4xl mb-3 animate-heart-pulse">💕</div>
        <h1 className="font-dancing text-3xl sm:text-4xl font-bold text-primary">
          Sera,
        </h1>
      </div>
      <Flourish />
      <ScrollArea className="h-72 mb-6">
        <div className="parchment rounded-xl p-5 space-y-4">
          <p className="font-playfair text-sm sm:text-base leading-relaxed text-foreground">
            I don't think I say this enough, but having you in my life has
            changed everything in the best way possible. You bring a kind of
            warmth and light that I didn't even know I was missing until you
            came along. Every moment with you, whether it's something small or
            something unforgettable, means more to me than I can fully put into
            words.
          </p>
          <p className="font-playfair text-sm sm:text-base leading-relaxed text-foreground">
            I love the way you understand me without me having to explain, the
            way your smile can completely turn my day around, and the way just
            being near you feels like home. You're not just my girlfriend—you're
            my comfort, my happiness, and one of the most important parts of my
            life.
          </p>
          <p className="font-playfair text-sm sm:text-base leading-relaxed text-foreground">
            I promise to always stand by you, to support you, and to keep
            choosing you every single day. No matter where life takes us, I want
            you to know that my feelings for you are real, deep, and only
            growing stronger.
          </p>
          <p className="font-playfair text-sm sm:text-base leading-relaxed text-foreground">
            Thank you for being you, Sera. I'm truly lucky to have you.
          </p>
          <p className="font-playfair text-sm sm:text-base leading-relaxed text-foreground italic mt-2">
            With all my love,
            <br />
            <span className="font-dancing text-xl text-primary font-semibold">
              Thejas
            </span>
          </p>
        </div>
      </ScrollArea>
      <RomanticButton onClick={onNext}>Next Page 🌸</RomanticButton>
    </LoveCard>
  );
}

// ── Step 5 – Photo Page ──────────────────────────────────────────────────────
function StepPhoto({ onNext }: { onNext: () => void }) {
  const [imgError, setImgError] = useState(false);
  return (
    <LoveCard>
      <div className="text-center mb-4">
        <p className="font-dancing text-2xl sm:text-3xl text-primary font-semibold">
          Our Story 💕
        </p>
      </div>
      <div className="flex justify-center mb-6">
        <div className="photo-frame">
          <div className="photo-frame-inner">
            {imgError ? (
              <div
                className="w-full flex flex-col items-center justify-center gap-3 text-primary/60"
                style={{
                  minHeight: "240px",
                  background:
                    "linear-gradient(135deg, oklch(0.96 0.03 8), oklch(0.92 0.05 355))",
                }}
              >
                <span className="text-5xl">💕</span>
                <p className="font-playfair italic text-sm">You & Me, Always</p>
              </div>
            ) : (
              <img
                src="/img-20260401-wa0025-019d4a6c-79f7-749d-9d82-d09faf1b1d0c.jpg"
                alt="My beautiful Sera"
                className="w-full block object-cover"
                style={{ maxHeight: "320px", minHeight: "200px" }}
                onError={() => setImgError(true)}
              />
            )}
          </div>
          <span className="absolute -top-2 -left-2 text-lg">💗</span>
          <span className="absolute -top-2 -right-2 text-lg">💗</span>
          <span className="absolute -bottom-2 -left-2 text-lg">💗</span>
          <span className="absolute -bottom-2 -right-2 text-lg">💗</span>
        </div>
      </div>
      <Flourish />
      <div className="parchment rounded-xl p-5 mb-6">
        <p className="font-playfair text-sm sm:text-base leading-relaxed text-foreground text-center">
          Kunja, I don't always say this, but you mean so much to me. Being with
          you just makes everything feel lighter and happier. I love the way you
          smile, the way you care, and how you always understand me even when I
          don't say much. With you, I feel comfortable being myself, and that's
          something really special to me. I'm really lucky to have you in my
          life. 💙
        </p>
      </div>
      <RomanticButton onClick={onNext}>Next Page 🌸</RomanticButton>
    </LoveCard>
  );
}

// ── Step 6 – Countdown + Letter ─────────────────────────────────────────────
const LETTER_LINES = [
  { text: "To My Sera 💖", bold: true, isTitle: true },
  {
    text: "It's been two months since January 12… and somehow, it already feels like you've been a part of my life forever.",
    bold: false,
  },
  {
    text: "I still think about that day a lot. Not just because it was the beginning of us, but because it was the moment everything started to feel a little more real, a little more meaningful. Since then, every day with you—even the smallest conversations—has meant more to me than I can properly explain.",
    bold: false,
  },
  {
    text: "These two months may not seem like a long time to the world, but to me, they're filled with moments I wouldn't trade for anything. The way you talk, the way you laugh, the way you just exist as you—it all stays with me. You've become a part of my daily thoughts, my routines, my happiness.",
    bold: false,
  },
  {
    text: "What I love most isn't just the big moments… it's the little things. The random chats, the way you make ordinary days feel special, and how just hearing from you can completely change my mood.",
    bold: false,
  },
  {
    text: "I don't know what the future holds exactly, but I do know one thing—I want more days like these with you. More memories, more laughs, more everything… with you, Sera.",
    bold: false,
  },
  { text: "Thank you for these beautiful two months.", bold: false },
  {
    text: "And I'm really looking forward to all the ones still to come.",
    bold: false,
  },
  { text: "Yours, always ❤️", bold: true },
];

function StepCountdownLetter({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<"countdown" | "letter">("countdown");
  const [count, setCount] = useState(5);
  const [visibleLines, setVisibleLines] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (phase !== "countdown") return;
    if (count > 0) {
      timerRef.current = setTimeout(() => setCount((c) => c - 1), 1000);
    } else {
      timerRef.current = setTimeout(() => setPhase("letter"), 600);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, count]);

  useEffect(() => {
    if (phase !== "letter") return;
    if (visibleLines < LETTER_LINES.length) {
      timerRef.current = setTimeout(() => setVisibleLines((v) => v + 1), 1200);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, visibleLines]);

  const allRevealed = phase === "letter" && visibleLines >= LETTER_LINES.length;

  return (
    <LoveCard>
      {phase === "countdown" && (
        <div className="flex flex-col items-center justify-center py-12 gap-6">
          <p className="font-playfair text-lg text-muted-foreground italic">
            Something special is coming…
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={count}
              initial={{ opacity: 0, scale: 2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.5 }}
              className="font-dancing text-center"
              style={{
                fontSize: "6rem",
                lineHeight: 1,
                color: "oklch(0.55 0.13 5)",
              }}
            >
              {count > 0 ? count : "💖"}
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2">
            {[5, 4, 3, 2, 1].map((n) => (
              <div
                key={n}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${count < n ? "bg-primary" : "bg-border"}`}
              />
            ))}
          </div>
        </div>
      )}

      {phase === "letter" && (
        <>
          <ScrollArea className="h-80 mb-6">
            <div className="parchment rounded-xl p-5 space-y-4">
              {LETTER_LINES.slice(0, visibleLines).map((line) => (
                <motion.p
                  key={line.text.slice(0, 20)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`font-playfair leading-relaxed text-foreground ${
                    line.isTitle
                      ? "text-xl sm:text-2xl font-bold text-primary text-center font-dancing mb-2"
                      : line.bold
                        ? "text-sm sm:text-base font-semibold italic text-center"
                        : "text-sm sm:text-base"
                  }`}
                >
                  {line.text}
                </motion.p>
              ))}
            </div>
          </ScrollArea>
          {allRevealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <RomanticButton onClick={onNext}>Next Page 🌸</RomanticButton>
            </motion.div>
          )}
        </>
      )}
    </LoveCard>
  );
}

// ── Step 7 – 100 Reasons ─────────────────────────────────────────────────────
const REASONS = [
  "I love your smile",
  "I love your laugh",
  "I love the way you talk",
  "I love your kindness",
  "I love your voice",
  "I love how you make me feel",
  "I love your eyes",
  "I love your honesty",
  "I love your caring nature",
  "I love how you understand me",
  "I love talking to you",
  "I love your little habits",
  "I love your energy",
  "I love your personality",
  "I love how you make me happy",
  "I love your presence",
  "I love how you listen",
  "I love your patience",
  "I love your support",
  "I love your warmth",
  "I love the way you think",
  "I love your sense of humor",
  "I love how you cheer me up",
  "I love your good heart",
  "I love how you make things better",
  "I love being with you",
  "I love your vibe",
  "I love your softness",
  "I love your strength",
  "I love your honesty with me",
  "I love your texts",
  "I love your calls",
  "I love your reactions",
  "I love your excitement",
  "I love your little jokes",
  "I love your mood swings (even those)",
  "I love how real you are",
  "I love your attention",
  "I love how you remember things",
  "I love your uniqueness",
  "I love your confidence",
  "I love your shyness sometimes",
  "I love your smile at random things",
  "I love how you care about others",
  "I love how you trust me",
  "I love how you make me feel special",
  "I love your love for me",
  "I love your honesty in tough moments",
  "I love your effort",
  "I love how you stay",
  "I love your good mornings",
  "I love your good nights",
  "I love your little messages",
  "I love your long talks",
  "I love your random thoughts",
  "I love your reactions to things",
  "I love how you miss me",
  "I love how you think of me",
  "I love your voice when you're happy",
  "I love your voice when you're sleepy",
  "I love how you make me laugh",
  "I love how you make me think",
  "I love how you make me feel safe",
  "I love how you make me calm",
  "I love how you understand silence",
  "I love how you stay even in hard times",
  "I love how you believe in me",
  "I love how you forgive",
  "I love how you care deeply",
  "I love how you try",
  "I love your little cute moments",
  "I love how you react when I tease you",
  "I love how you get excited",
  "I love your random moods",
  "I love your honesty",
  "I love your realness",
  "I love how you make memories with me",
  "I love your presence in my life",
  "I love your way of loving me",
  "I love everything about you",
  "I love how you stay on my mind",
  "I love how you make normal days special",
  "I love how you complete my day",
  "I love how you make me feel lucky",
  "I love how you make me better",
  "I love how you changed my life",
  "I love how you came into my life",
  "I love how you stayed",
  "I love how you became mine",
  "I love being yours",
  "I love your name, Sera",
  "I love saying your name",
  "I love thinking about you",
  "I love dreaming about you",
  "I love missing you",
  "I love caring for you",
  "I love loving you",
  "I love us",
  "I love our story",
  "I love you, always ❤️",
];

function StepHundredReasons({ onNext }: { onNext: () => void }) {
  return (
    <LoveCard>
      <div className="text-center mb-5">
        <div className="text-4xl mb-3 animate-heart-pulse">💯</div>
        <h1 className="font-dancing text-2xl sm:text-3xl font-bold text-primary">
          100 Reasons I Love You, sanguuu 💖
        </h1>
      </div>
      <Flourish />
      <ScrollArea className="h-80 mb-6">
        <div className="parchment rounded-xl p-5 space-y-2">
          {REASONS.map((reason, idx) => (
            <div
              key={reason}
              className="flex items-start gap-3 py-1.5 border-b border-primary/10 last:border-0"
            >
              <span className="font-dancing text-primary font-bold text-lg min-w-[2rem] text-right shrink-0">
                {idx + 1}.
              </span>
              <p className="font-playfair text-sm sm:text-base leading-relaxed text-foreground">
                {reason}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
      <RomanticButton onClick={onNext}>Next Page 🌸</RomanticButton>
    </LoveCard>
  );
}

// ── Step 8 – Malayalam Note ──────────────────────────────────────────────────
function StepMalayalamNote({ onNext }: { onNext: () => void }) {
  return (
    <LoveCard>
      <div className="text-center mb-6">
        <div className="text-5xl mb-4 animate-heart-pulse">💋</div>
      </div>
      <Flourish />
      <div className="parchment rounded-xl p-6 mb-6">
        <p className="font-dancing text-2xl sm:text-3xl leading-relaxed text-foreground text-center">
          Pinee pryan mrann nii ente ahh ketooo😒💋
        </p>
      </div>
      <RomanticButton onClick={onNext}>Last Page 💖</RomanticButton>
    </LoveCard>
  );
}

// ── Step 9 – Final Message ───────────────────────────────────────────────────
function StepFinalMessage() {
  return (
    <>
      <FloatingHearts />
      <LoveCard>
        <div className="text-center mb-6 relative z-10">
          <div className="text-5xl mb-4 animate-sparkle">💋</div>
          <h1 className="font-dancing text-3xl sm:text-4xl font-bold text-primary mb-2">
            Forever &amp; Always
          </h1>
        </div>
        <Flourish />
        <div className="relative z-10 flex flex-col gap-5 text-center">
          <div className="parchment rounded-xl p-5">
            <p className="font-playfair text-base sm:text-xl leading-relaxed text-foreground italic">
              Kunjaa mammal etra distance il ayalum brk up avialllaooo💋
            </p>
          </div>
          <div
            className="rounded-xl p-5"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.62 0.11 10 / 0.12), oklch(0.52 0.13 350 / 0.08))",
              border: "1px solid oklch(0.62 0.11 10 / 0.2)",
            }}
          >
            <p className="font-dancing text-2xl sm:text-3xl leading-relaxed text-foreground font-semibold">
              Loveee youu umhhhaahhh💋💋💋💋💋💋💋💋💋💋
            </p>
          </div>
          <div className="text-3xl mt-2 animate-heart-pulse">
            ❤️ 💕 💖 💗 💝 💘
          </div>
        </div>
      </LoveCard>
    </>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState<Step>(1);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const advance = useCallback(() => {
    setStep((prev) => Math.min(prev + 1, 9) as Step);
  }, []);

  const handleUnlock = useCallback(() => {
    setMusicPlaying(true);
    advance();
  }, [advance]);

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <PageBackground />
      <FloatingPetals />
      <BackgroundMusic playing={musicPlaying} />
      {step > 1 && (
        <MusicToggle
          playing={musicPlaying}
          onToggle={() => setMusicPlaying((p) => !p)}
        />
      )}
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-10">
        <Stepper current={step} />
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.97 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              {step === 1 && <StepLogin onUnlock={handleUnlock} />}
              {step === 2 && <StepLoveLetter onNext={advance} />}
              {step === 3 && <StepMarryMe onNext={advance} />}
              {step === 4 && <StepSeraLetter onNext={advance} />}
              {step === 5 && <StepPhoto onNext={advance} />}
              {step === 6 && <StepCountdownLetter onNext={advance} />}
              {step === 7 && <StepHundredReasons onNext={advance} />}
              {step === 8 && <StepMalayalamNote onNext={advance} />}
              {step === 9 && <StepFinalMessage />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <footer className="relative z-10 text-center text-xs text-muted-foreground py-4 font-lato">
        Made with ❤️ by Thejas
      </footer>
    </div>
  );
}
