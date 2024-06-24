export interface Rank {
  Engagement_Score: number;
  count_likes: number;
  count_recasts: number;
  count_replies: number;
  fid: number;
  total_engagement: number;
  rank: number;
}

export interface Profile {
  bio: {
    text: string;
  };
}

export interface VerifiedAddresses {
  eth_addresses: string[];
  sol_addresses: string[];
}

export interface ViewerContext {
  following: boolean;
  followed_by: boolean;
}

export interface UserData {
  object: string;
  fid: number;
  custody_address: string;
  username: string;
  display_name: string;
  pfp_url: string;
  profile: Profile;
  follower_count: number;
  following_count: number;
  verifications: string[];
  verified_addresses: VerifiedAddresses;
  active_status: string;
  power_badge: boolean;
  viewer_context: ViewerContext;
}
