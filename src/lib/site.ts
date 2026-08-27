export const site = {
  name: "VXNUS",
  description: "Technology Creative Studio.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vxnus.xyz",
  github: {
    name: "vxnus-studio",
    handle: "vxnus-studio",
    url: "https://github.com/vxnus-studio",
  },
  founder: {
    name: "Kur Zagin",
    url: "https://krzgn.xyz",
  },
} as const;
