export class CreatePropertyDto {
  name: string;

  ownerName?: string;

  ownerCpfCnpj?: string;

  city?: string;

  fullAddress?: string;

  state?: string;

  latitude: number;

  longitude: number;
}
