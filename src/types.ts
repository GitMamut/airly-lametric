export type LM_response = {
  frames: LM_frame[];
};

type LM_frame = {
  text: string;
  icon: string;
  index: number;
};