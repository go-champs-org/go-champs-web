import type { PlayerEntity } from '@gochamps/api-client';

export type SocialNetwork = 'instagram' | 'twitter' | 'facebook';

export interface SocialLink {
  network: SocialNetwork;
  href: string;
}

export type PlayerSocialHandles = Pick<PlayerEntity, 'instagram' | 'twitter' | 'facebook'>;

const NETWORK_HOSTS: Record<SocialNetwork, string> = {
  instagram: 'https://instagram.com',
  twitter: 'https://twitter.com',
  facebook: 'https://facebook.com'
};

const NETWORKS: SocialNetwork[] = ['instagram', 'twitter', 'facebook'];

const cleanHandle = (handle: string | undefined): string =>
  (handle || '').trim().replace(/^@/, '');

export const playerSocialLinks = (player: PlayerSocialHandles): SocialLink[] =>
  NETWORKS.map(network => ({ network, handle: cleanHandle(player[network]) }))
    .filter(({ handle }) => handle !== '')
    .map(({ network, handle }) => ({
      network,
      href: `${NETWORK_HOSTS[network]}/${handle}`
    }));
