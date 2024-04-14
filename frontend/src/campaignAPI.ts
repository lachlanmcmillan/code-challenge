const CAMPAIGNS_URL = "/campaigns.json";

export interface Campaign {
  id: string; // "794678333591617537",
  company: {
    name: string; // "Maslow",
    industry: string; // "Fintech",
    mainImage: string; // "https://storage.googleapis.com/birchal-uploads/d89b5f34-70a1-4c3a-9d96-326595d135af/d89b5f34-70a1-4c3a-9d96-326595d135af@640x360.jpeg",
    logoImage: string; // "https://storage.googleapis.com/birchal-uploads/551503d0-8229-42cf-b0a3-a040ed823224/551503d0-8229-42cf-b0a3-a040ed823224@300x300.png",
    coverImage: string; // "https://storage.googleapis.com/birchal-uploads/702c5e3e-8156-4f98-97fe-95aed688ca61/702c5e3e-8156-4f98-97fe-95aed688ca61@1920x1080.jpeg"
  },
  type: "EOI" | "OFFER"; // "EOI"
  status: "LIVE" | "CLOSED"; // "LIVE"
  closingInDays: number; // 10.458603958333333
  closeDate: string; // "2024-04-02T11:00:00.000Z"
  closeDateFormatted: string; // "Apr 2, 2024 at 10pm"
}

export interface IError {
  type: 'FETCH' | 'JSON';
  error?: Error;
}

export interface IGetCampaigns {
  data?: Campaign[];
  error?: IError;
}

export const getCampaigns = async (): Promise<IGetCampaigns> => {
  const response = await fetch(CAMPAIGNS_URL, { 
    method: 'GET',
    headers: {
      Accept: 'application/json'
    },
  });

  if (!response) {
    return { 
      error: { type: 'FETCH' }
    };
  }

  if (!response.ok) {
    return {
      error: { type: 'FETCH' }
    }
  }

  let data;
  try {
    data = await response.json() as Campaign[];
  } catch (error) {
    // todo return error
    return {
      error: { type: 'JSON', error: error as Error }
    }
  }

  return { data };
}