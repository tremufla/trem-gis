export class FindAllPropertyResponseDto {
  id: string;

  name: string;

  ownerName?: string;

  ownerCpfCnpj?: string;

  city?: string;

  fullAddress?: string;

  state?: string;

  latitude: number;

  longitude: number;
}
