export interface AtomicProp {
  _id: string;
  electrConfig: string;
  oxidationStates: {
    a: boolean[];
    b: boolean[];
  };
  vanDerWaalsRadius: string;
  atomRadius: string;
  covalentRadius: string;
  ionCharge: string;
  ionizationPotentialAtom: string;
}
