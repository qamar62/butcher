import Reveal from "./Reveal";

export default function SectionTitle({
  kicker,
  title,
  text,
  center = true,
  light = false,
}: {
  kicker: string;
  title: React.ReactNode;
  text?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-brand">
        <span className="h-px w-8 bg-brand" />
        {kicker}
        {center && <span className="h-px w-8 bg-brand" />}
      </span>
      <h2 className={`mt-4 text-4xl font-bold leading-[1.05] md:text-5xl ${light ? "!text-white" : ""}`}>{title}</h2>
      {text && <p className={`mt-5 text-lg ${light ? "text-white/70" : "text-body"}`}>{text}</p>}
    </Reveal>
  );
}
