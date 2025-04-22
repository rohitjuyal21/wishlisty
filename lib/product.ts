export const priorityDisplayMap: Record<string, string> = {
  MUST_HAVE: "Must Have",
  NICE_TO_HAVE: "Nice to Have",
  MAYBE_LATER: "Maybe Later",
};

export const priorityDisplayStyle: Record<string, string> = {
  MUST_HAVE: "text-red-500 bg-red-500/20",
  NICE_TO_HAVE: "text-yellow-500 bg-yellow-500/20",
  MAYBE_LATER: "text-green-500 bg-green-500/20",
};

export const priorityOptions = [
  { label: "Must Have", value: "MUST_HAVE" },
  { label: "Nice to Have", value: "NICE_TO_HAVE" },
  { label: "Maybe Later", value: "MAYBE_LATER" },
];
