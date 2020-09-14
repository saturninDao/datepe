import { Personne } from '../models/personne.model';


export class Proprietaire implements Personne{
    constructor(
        public adresse:string,
        public description:string,
        public email:string,
        public nomPrenom: string,
        public numTel:string
        ){}
    profil: string;
}