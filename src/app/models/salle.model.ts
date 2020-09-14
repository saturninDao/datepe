import {MesImages} from '../models/mesimages.model';
import {Proprietaire} from '../models/proprietaire.model';
export class Salle {

    constructor(
        public categorie: string,
        public description: string,
        public etatSalle: string,
        public image: MesImages,
        public lieu: string,
        public nomSalle: string,
        public nombrePlace: number,
        public prix: number,
        public proprio: Proprietaire,
        public type: string) {}
}

