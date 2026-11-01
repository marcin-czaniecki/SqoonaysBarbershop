export interface GoogleReview {
  readonly id: string;
  readonly author: {
    readonly name: string;
    readonly profileUrl: string;
    readonly avatarUrl?: string;
  };
  readonly rating: 1 | 2 | 3 | 4 | 5;
  readonly text: string;
  readonly publishedAt: string;
  readonly sourceUrl: string;
  readonly translated?: boolean;
}

// A future server-side adapter supplies this state; credentials never belong in this file.
export type GoogleReviewsState =
  | { readonly status: 'not-connected' | 'unavailable' }
  | {
      readonly status: 'ready';
      readonly averageRating: number;
      readonly totalReviewCount: number;
      readonly reviews: readonly GoogleReview[];
      readonly updatedAt: string;
      readonly selectionDescription: string;
    };

// Links supplied by the owner. No reviews are imported, estimated or scraped.
export const googleReviews = {
  profileUrl: 'https://maps.app.goo.gl/YjZ2wrKRy9YpHzVGA',
  writeReviewUrl: 'https://g.page/r/CULNfIfXWZ_jEBM/review',
} as const;

export const googleReviewsState: GoogleReviewsState = { status: 'not-connected' };
