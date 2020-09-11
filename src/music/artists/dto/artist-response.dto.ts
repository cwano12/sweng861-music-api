import { Bio } from '../../types/bio';

export class ArtistResponseDto {
    id!: string;

    name!: string;

    bios!: Bio[];

    albumGroups!: { main: string[] };

    links!: { images: { href: string } };
}
