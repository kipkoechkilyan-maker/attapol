const earners = [
  "John from Nairobi earned Ksh 3,000 this week",
  "Mary from Mombasa earned Ksh 2,500 yesterday",
  "David from Kisumu earned Ksh 4,000 last month",
  "Sarah from Eldoret earned Ksh 2,800 this week",
  "Michael from Nakuru earned Ksh 3,500 last month",
];

const EarningsTicker = () => {
  return (
    <div className="py-4 bg-muted overflow-hidden border-y border-border">
      <div className="flex animate-scroll-left whitespace-nowrap">
        {[...earners, ...earners].map((text, i) => (
          <span
            key={i}
            className="mx-8 text-sm text-primary font-medium inline-flex items-center gap-2"
          >
            <span className="h-2 w-2 rounded-full gradient-green inline-block" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EarningsTicker;
