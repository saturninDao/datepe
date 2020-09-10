export class Salle {
    constructor(
        public etatSalle: string,
        public image: any[],
        public lieu: string,
        public nombrePlace: number,
        public prix: number,
        public proprio: any[],
        public type: string) {}
}