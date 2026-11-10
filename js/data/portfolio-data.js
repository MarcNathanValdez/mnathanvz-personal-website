/**
 * portfolio-data.js
 * ---------------------------------------------------------------
 * All portfolio items live here. To add a new project, copy one
 * line, paste it in the list, and change the values.
 *
 *  type      "image" | "video" | "website"
 *  category  must match one of the keys in CATEGORIES below
 *  src       folder + file name (folders are listed below)
 *  link      (website only) live URL of the site
 *
 * To add a new project: put the file in the matching folder
 * inside /assets, then add a line here.
 * ---------------------------------------------------------------
 */

// Leave this empty — files load from this site's own /assets folder.
// (Put a domain here only if your files live on another server.)
const ASSET_BASE = "";

const CATEGORIES = {
  social: "Social media graphic",
  email: "Email marketing template",
  photo: "Edited photo",
  flowchart: "Flowchart graphic",
  logo: "Logo",
  longVideo: "Long-form video",
  shortVideo: "Short-form video",
  website: "Website",
};

/* ---------- Asset folders ---------- */
// Images
const SOCIAL      = "assets/images/graphic-design/social-media/";
const EMAIL       = "assets/images/graphic-design/email-templates/";
const PHOTOS      = "assets/images/graphic-design/edited-photos/";
const FLOWCHARTS  = "assets/images/graphic-design/flowcharts/";
const LOGOS       = "assets/images/graphic-design/logos/";
const WEBSITES    = "assets/images/websites/";

// Videos
const PSPACE      = "assets/videos/pspace/";
const ZEN         = "assets/videos/zens-informative-tv-show/";
const ADAPOT      = "assets/videos/adapot-vlog/";
const INNER_SPARC = "assets/videos/inner-sparc-realty/";
const ROVE_CHEM   = "assets/videos/rove-chem-trading/";

const PORTFOLIO_ITEMS = [
  /* ---------- Social media graphics ---------- */
  { type: "image", category: "social", title: "Saikicks Sneaker Savior (Poster)", tools: "Adobe Illustrator and Canva", src: SOCIAL + "Saikicks Savior Sneaker (Poster).png" },
  { type: "image", category: "social", title: "Facebook ad for Entikis Bookkeeping", tools: "Adobe Illustrator", src: SOCIAL + "FB ad.jpg" },
  { type: "image", category: "social", title: "Saikicks business advertisement", tools: "Adobe Photoshop and Canva", src: SOCIAL + "Saikicks Business ad.jpg" },
  { type: "image", category: "social", title: "Recruitment poster", tools: "Canva", src: SOCIAL + "Hiring Recruitment Poster.png" },
  { type: "image", category: "social", title: "Recruitment poster for Senior Manager, Inner Sparc Realty Corp.", tools: "Canva", src: SOCIAL + "Recruitment Poster for Mr. & Mrs. Violenta.png" },
  { type: "image", category: "social", title: "Cavite map projects poster for Inner Sparc Realty Corp.", tools: "Adobe Photoshop", src: SOCIAL + "Cavite Map Projects 2.png" },
  { type: "image", category: "social", title: "Savia Facebook page cover", tools: "Canva", src: SOCIAL + "Savia Fb Page Cover Postor.png" },
  { type: "image", category: "social", title: "Inner Sparc Realty price list", tools: "Canva", src: SOCIAL + "Inner Sparc Realty Price.png" },
  { type: "image", category: "social", title: "Recruitment poster for Inner Sparc Realty Corp.", tools: "Canva", src: SOCIAL + "Recruitment Poster.png" },
  { type: "image", category: "social", title: "Collage poster with trademark", tools: "Canva", src: SOCIAL + "Collage Poster with Trademark.png" },
  { type: "image", category: "social", title: "Poster with trademark", tools: "Canva", src: SOCIAL + "Poster with Trademark.png" },
  { type: "image", category: "social", title: "Promo template with contact number", tools: "Canva", src: SOCIAL + "Promo Template w_ contact number.png" },
  { type: "image", category: "social", title: "Inner Sparc Realty agents profile", tools: "Canva", src: SOCIAL + "Inner Sparc Realty Agents Profile.png" },
  { type: "image", category: "social", title: "Kathleen Place 5 poster ads", tools: "Canva", src: SOCIAL + "Kathleen Place 5 Poster.png" },

  /* ---------- Email marketing templates ---------- */
  { type: "image", category: "email", title: "Email marketing template 1", tools: "Adobe Illustrator", src: EMAIL + "(1) Email Marketing Template.jpg" },
  { type: "image", category: "email", title: "Email marketing template 2", tools: "Adobe Illustrator", src: EMAIL + "Email Marketing Template - 2.jpg" },
  { type: "image", category: "email", title: "Email marketing template 3", tools: "Adobe Illustrator", src: EMAIL + "(3) Email Marketing Template.jpg" },
  { type: "image", category: "email", title: "Email marketing template 4", tools: "Adobe Illustrator", src: EMAIL + "(4) Email Marketing Template.jpg" },
  { type: "image", category: "email", title: "Email marketing template 5", tools: "Adobe Illustrator", src: EMAIL + "5 Email Marketing Template.jpg" },
  { type: "image", category: "email", title: "Email marketing template 6", tools: "Adobe Illustrator", src: EMAIL + "6 Email Marketing Template.jpg" },
  { type: "image", category: "email", title: "Email marketing template 7", tools: "Adobe Illustrator", src: EMAIL + "7 Email Marketing Template.jpg" },
  { type: "image", category: "email", title: "Email marketing template 8", tools: "Adobe Illustrator", src: EMAIL + "8 Email Marketing Template.jpg" },
  { type: "image", category: "email", title: "Email marketing template 9", tools: "Adobe Illustrator", src: EMAIL + "9 Email Marketing Template.jpg" },
  { type: "image", category: "email", title: "Email marketing template 10", tools: "Adobe Illustrator", src: EMAIL + "Email Marketing Template - 11.jpg" },
  { type: "image", category: "email", title: "Email marketing template 11", tools: "Adobe Illustrator", src: EMAIL + "Email Marketing Template - 12.jpg" },
  { type: "image", category: "email", title: "Email marketing template 12", tools: "Adobe Illustrator", src: EMAIL + "Email Marketing Template - 13.png" },

  /* ---------- Edited photos ---------- */
  { type: "image", category: "photo", title: "Beatrix 5th birthday poster (1)", tools: "Canva", src: PHOTOS + "(1) Beatrix 5th Birthday Poster.jpg" },
  { type: "image", category: "photo", title: "Beatrix 5th birthday poster (2)", tools: "Canva", src: PHOTOS + "(2) Beatrix 5th Birthday Poster.png" },
  { type: "image", category: "photo", title: "Beatrix 5th birthday poster (3)", tools: "Canva", src: PHOTOS + "(3) Beatrix 5th Birthday Poster.png" },
  { type: "image", category: "photo", title: "Beatrix 5th birthday poster (4)", tools: "Canva", src: PHOTOS + "(4) Beatrix 5th Birthday Poster.png" },

  /* ---------- Flowcharts ---------- */
  { type: "image", category: "flowchart", title: "Flowchart 1", tools: "Adobe Illustrator", src: FLOWCHARTS + "1 - Flow chart.png" },
  { type: "image", category: "flowchart", title: "Flowchart 2", tools: "Adobe Illustrator", src: FLOWCHARTS + "2 - Flow chart.png" },

  /* ---------- Logos ---------- */
  { type: "image", category: "logo", title: "Saikicks Sneaker Savior typography", tools: "Adobe Illustrator", src: LOGOS + "Saikicks Sneaker Savior Logo Typography.png" },
  { type: "image", category: "logo", title: "Entikis Bookkeeping logo", tools: "Adobe Illustrator", src: LOGOS + "Entikis Bookkeeping Logo.jpg" },
  { type: "image", category: "logo", title: "MA Fabulous Hair and Beauty Salon logo", tools: "Adobe Illustrator", src: LOGOS + "salon logo without bg.png" },

  /* ---------- Long-form videos ---------- */
  { type: "video", category: "longVideo", title: "ATS terminology for stations, communication methods, and approach operation", tools: "Learning course", src: PSPACE + "ATS Terminology for Stations, Communication Methods, and Approach Operation.mp4" },
  { type: "video", category: "longVideo", title: "Zen’s Informative TV Show! Part I", tools: "Learning course", src: ZEN + "Zen's Informative TV Show! Part I.mp4" },
  { type: "video", category: "longVideo", title: "Zen’s Informative TV Show! Part II", tools: "Learning course", src: ZEN + "Zen's Informative TV Show! Part II.mp4" },

  /* ---------- Short-form videos ---------- */
  { type: "video", category: "shortVideo", title: "Adapot Vlog 2.0 intro", tools: "Vlog intro", src: ADAPOT + "Adapot Vlog 2.0_Intro.mp4" },
  { type: "video", category: "shortVideo", title: "Adapot Vlog 2.0 outro", tools: "Vlog outro", src: ADAPOT + "Adapot Vlog 2.0_Outro.mp4" },
  { type: "video", category: "shortVideo", title: "Inner Sparc Realty recruitment ads", tools: "Meta ads", src: INNER_SPARC + "Inner Sparc Realty Corporation Recruitment Ads.mp4" },
  { type: "video", category: "shortVideo", title: "Reel for Inner SPARC Realty Corporation", tools: "Meta ads", src: INNER_SPARC + "Reel_Type_Video_Portrait.mp4" },
  { type: "video", category: "shortVideo", title: "Facebook ad for Inner SPARC Realty Corporation", tools: "Meta ads", src: INNER_SPARC + "Youtube_Facebook Advertisement.mp4" },
  { type: "video", category: "shortVideo", title: "Inner Sparc Realty ads", tools: "Meta ads", src: INNER_SPARC + "Inner Sparc Realty Ads.mp4" },
  { type: "video", category: "shortVideo", title: "Renting vs. owning ads", tools: "Meta ads", src: INNER_SPARC + "Renting Vs. Owning Ads.mp4" },
  { type: "video", category: "shortVideo", title: "1-minute reel for Savia Parkway", tools: "Promotional ads", src: INNER_SPARC + "1 minute Video Reels for Savia Parkway.mp4" },
  { type: "video", category: "shortVideo", title: "Bank financing ads", tools: "Promotional ads", src: INNER_SPARC + "Inner Sparc Realty Corporation Bank Financing Ads.mp4" },
  { type: "video", category: "shortVideo", title: "Client house inspection, Lancaster New City", tools: "Promotional ads", src: INNER_SPARC + "Client House Inspection.mp4" },
  { type: "video", category: "shortVideo", title: "Tips in buying a home", tools: "Promotional ads", src: INNER_SPARC + "Tips in Buying Home.mp4" },
  { type: "video", category: "shortVideo", title: "Lancaster townhouse", tools: "Promotional ads", src: INNER_SPARC + "Lancaster Townhouse Ads.mp4" },
  { type: "video", category: "shortVideo", title: "Lancaster City", tools: "Promotional ads", src: INNER_SPARC + "Lancaster Ads.mp4" },
  { type: "video", category: "shortVideo", title: "Inner SPARC Realty TikTok reel", tools: "TikTok reels", src: INNER_SPARC + "Reels Tiktok.mp4" },
  { type: "video", category: "shortVideo", title: "Recruitment video for Inner Sparc Realty Corp.", tools: "Recruitment ads", src: INNER_SPARC + "Recruitment Video (1).mp4" },
  { type: "video", category: "shortVideo", title: "Rent to own, talking head (1)", tools: "Talking heads", src: INNER_SPARC + "Transcripting (1).mp4" },
  { type: "video", category: "shortVideo", title: "Rent to own, talking head (2)", tools: "Talking heads", src: ROVE_CHEM + "Transcripting (2).mp4" },
  { type: "video", category: "shortVideo", title: "Lancaster New City", tools: "Talking heads", src: INNER_SPARC + "New Lancaster City.mp4" },

  /* ---------- Websites ---------- */
  { type: "website", category: "website", title: "Riot Music Studio", tools: "HTML, CSS, PHP and JavaScript", src: WEBSITES + "riotmusicstudio.png", link: "https://marcnathanvaldez.github.io/riotmusicroom/" },
  { type: "website", category: "website", title: "Real Property Management", tools: "Go High Level", src: WEBSITES + "Wealth Optimizer Website.png", link: "https://rpmoptimizer.com/" },
];
