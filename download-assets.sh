#!/usr/bin/env bash
# =================================================================
# download-assets.sh  (Mac / Linux)
# -----------------------------------------------------------------
# Downloads every image, video and document from your live site
# (www.mnathanvz.online) into the matching folders in /assets.
#
# How to run (in this folder):   bash download-assets.sh
# Safe to run again: files you already have are skipped.
# =================================================================

cd "$(dirname "$0")" || exit 1
downloaded=0; skipped=0; failed=0

# Each line: address on your live site <TAB> where it goes in this project
while IFS=$'\t' read -r url path; do
  [ -z "$url" ] && continue
  if [ -f "$path" ]; then skipped=$((skipped + 1)); continue; fi

  echo "Downloading $path ..."
  if curl -fsSL --create-dirs -o "$path" "$url"; then
    downloaded=$((downloaded + 1))
  else
    echo "  Could not download: $url"
    rm -f "$path"
    failed=$((failed + 1))
  fi
done <<'LIST'
https://www.mnathanvz.online/assets/img/graphic_design/Saikicks%20Savior%20Sneaker%20%28Poster%29.png	assets/images/graphic-design/social-media/Saikicks Savior Sneaker (Poster).png
https://www.mnathanvz.online/assets/img/graphic_design/FB%20ad.jpg	assets/images/graphic-design/social-media/FB ad.jpg
https://www.mnathanvz.online/assets/img/graphic_design/Saikicks%20Business%20ad.jpg	assets/images/graphic-design/social-media/Saikicks Business ad.jpg
https://www.mnathanvz.online/assets/img/graphic_design/Hiring%20Recruitment%20Poster.png	assets/images/graphic-design/social-media/Hiring Recruitment Poster.png
https://www.mnathanvz.online/assets/img/graphic_design/Recruitment%20Poster%20for%20Mr.%20%26%20Mrs.%20Violenta.png	assets/images/graphic-design/social-media/Recruitment Poster for Mr. & Mrs. Violenta.png
https://www.mnathanvz.online/assets/img/graphic_design/Cavite%20Map%20Projects%202.png	assets/images/graphic-design/social-media/Cavite Map Projects 2.png
https://www.mnathanvz.online/assets/img/graphic_design/Savia%20Fb%20Page%20Cover%20Postor.png	assets/images/graphic-design/social-media/Savia Fb Page Cover Postor.png
https://www.mnathanvz.online/assets/img/graphic_design/Inner%20Sparc%20Realty%20Price.png	assets/images/graphic-design/social-media/Inner Sparc Realty Price.png
https://www.mnathanvz.online/assets/img/graphic_design/Recruitment%20Poster.png	assets/images/graphic-design/social-media/Recruitment Poster.png
https://www.mnathanvz.online/assets/img/graphic_design/Collage%20Poster%20with%20Trademark.png	assets/images/graphic-design/social-media/Collage Poster with Trademark.png
https://www.mnathanvz.online/assets/img/graphic_design/Poster%20with%20Trademark.png	assets/images/graphic-design/social-media/Poster with Trademark.png
https://www.mnathanvz.online/assets/img/graphic_design/Promo%20Template%20w_%20contact%20number.png	assets/images/graphic-design/social-media/Promo Template w_ contact number.png
https://www.mnathanvz.online/assets/img/graphic_design/Inner%20Sparc%20Realty%20Agents%20Profile.png	assets/images/graphic-design/social-media/Inner Sparc Realty Agents Profile.png
https://www.mnathanvz.online/assets/img/graphic_design/Kathleen%20Place%205%20Poster.png	assets/images/graphic-design/social-media/Kathleen Place 5 Poster.png
https://www.mnathanvz.online/assets/img/graphic_design/%281%29%20Email%20Marketing%20Template.jpg	assets/images/graphic-design/email-templates/(1) Email Marketing Template.jpg
https://www.mnathanvz.online/assets/img/graphic_design/Email%20Marketing%20Template%20-%202.jpg	assets/images/graphic-design/email-templates/Email Marketing Template - 2.jpg
https://www.mnathanvz.online/assets/img/graphic_design/%283%29%20Email%20Marketing%20Template.jpg	assets/images/graphic-design/email-templates/(3) Email Marketing Template.jpg
https://www.mnathanvz.online/assets/img/graphic_design/%284%29%20Email%20Marketing%20Template.jpg	assets/images/graphic-design/email-templates/(4) Email Marketing Template.jpg
https://www.mnathanvz.online/assets/img/graphic_design/5%20Email%20Marketing%20Template.jpg	assets/images/graphic-design/email-templates/5 Email Marketing Template.jpg
https://www.mnathanvz.online/assets/img/graphic_design/6%20Email%20Marketing%20Template.jpg	assets/images/graphic-design/email-templates/6 Email Marketing Template.jpg
https://www.mnathanvz.online/assets/img/graphic_design/7%20Email%20Marketing%20Template.jpg	assets/images/graphic-design/email-templates/7 Email Marketing Template.jpg
https://www.mnathanvz.online/assets/img/graphic_design/8%20Email%20Marketing%20Template.jpg	assets/images/graphic-design/email-templates/8 Email Marketing Template.jpg
https://www.mnathanvz.online/assets/img/graphic_design/9%20Email%20Marketing%20Template.jpg	assets/images/graphic-design/email-templates/9 Email Marketing Template.jpg
https://www.mnathanvz.online/assets/img/graphic_design/Email%20Marketing%20Template%20-%2011.jpg	assets/images/graphic-design/email-templates/Email Marketing Template - 11.jpg
https://www.mnathanvz.online/assets/img/graphic_design/Email%20Marketing%20Template%20-%2012.jpg	assets/images/graphic-design/email-templates/Email Marketing Template - 12.jpg
https://www.mnathanvz.online/assets/img/graphic_design/Email%20Marketing%20Template%20-%2013.png	assets/images/graphic-design/email-templates/Email Marketing Template - 13.png
https://www.mnathanvz.online/assets/img/graphic_design/%281%29%20Beatrix%205th%20Birthday%20Poster.jpg	assets/images/graphic-design/edited-photos/(1) Beatrix 5th Birthday Poster.jpg
https://www.mnathanvz.online/assets/img/graphic_design/%282%29%20Beatrix%205th%20Birthday%20Poster.png	assets/images/graphic-design/edited-photos/(2) Beatrix 5th Birthday Poster.png
https://www.mnathanvz.online/assets/img/graphic_design/%283%29%20Beatrix%205th%20Birthday%20Poster.png	assets/images/graphic-design/edited-photos/(3) Beatrix 5th Birthday Poster.png
https://www.mnathanvz.online/assets/img/graphic_design/%284%29%20Beatrix%205th%20Birthday%20Poster.png	assets/images/graphic-design/edited-photos/(4) Beatrix 5th Birthday Poster.png
https://www.mnathanvz.online/assets/img/graphic_design/1%20-%20Flow%20chart.png	assets/images/graphic-design/flowcharts/1 - Flow chart.png
https://www.mnathanvz.online/assets/img/graphic_design/2%20-%20Flow%20chart.png	assets/images/graphic-design/flowcharts/2 - Flow chart.png
https://www.mnathanvz.online/assets/img/graphic_design/Saikicks%20Sneaker%20Savior%20Logo%20Typography.png	assets/images/graphic-design/logos/Saikicks Sneaker Savior Logo Typography.png
https://www.mnathanvz.online/assets/img/graphic_design/Entikis%20Bookkeeping%20Logo.jpg	assets/images/graphic-design/logos/Entikis Bookkeeping Logo.jpg
https://www.mnathanvz.online/assets/img/graphic_design/salon%20logo%20without%20bg.png	assets/images/graphic-design/logos/salon logo without bg.png
https://www.mnathanvz.online/assets/video/PSpace/ATS%20Terminology%20for%20Stations%2C%20Communication%20Methods%2C%20and%20Approach%20Operation.mp4	assets/videos/pspace/ATS Terminology for Stations, Communication Methods, and Approach Operation.mp4
https://www.mnathanvz.online/assets/video/Zen%27s%20Informative%20TV%20Show%21/Zen%27s%20Informative%20TV%20Show%21%20Part%20I.mp4	assets/videos/zens-informative-tv-show/Zen's Informative TV Show! Part I.mp4
https://www.mnathanvz.online/assets/video/Zen%27s%20Informative%20TV%20Show%21/Zen%27s%20Informative%20TV%20Show%21%20Part%20II.mp4	assets/videos/zens-informative-tv-show/Zen's Informative TV Show! Part II.mp4
https://www.mnathanvz.online/assets/video/Adapot%20Vlog%202.0/Adapot%20Vlog%202.0_Intro.mp4	assets/videos/adapot-vlog/Adapot Vlog 2.0_Intro.mp4
https://www.mnathanvz.online/assets/video/Adapot%20Vlog%202.0/Adapot%20Vlog%202.0_Outro.mp4	assets/videos/adapot-vlog/Adapot Vlog 2.0_Outro.mp4
https://www.mnathanvz.online/assets/video/Inner%20SPARC%20Realty%20Corporation/Inner%20Sparc%20Realty%20Corporation%20Recruitment%20Ads.mp4	assets/videos/inner-sparc-realty/Inner Sparc Realty Corporation Recruitment Ads.mp4
https://www.mnathanvz.online/assets/video/Inner%20SPARC%20Realty%20Corporation/Reel_Type_Video_Portrait.mp4	assets/videos/inner-sparc-realty/Reel_Type_Video_Portrait.mp4
https://www.mnathanvz.online/assets/video/Inner%20SPARC%20Realty%20Corporation/Youtube_Facebook%20Advertisement.mp4	assets/videos/inner-sparc-realty/Youtube_Facebook Advertisement.mp4
https://www.mnathanvz.online/assets/video/Inner%20SPARC%20Realty%20Corporation/Inner%20Sparc%20Realty%20Ads.mp4	assets/videos/inner-sparc-realty/Inner Sparc Realty Ads.mp4
https://www.mnathanvz.online/assets/video/Inner%20SPARC%20Realty%20Corporation/Renting%20Vs.%20Owning%20Ads.mp4	assets/videos/inner-sparc-realty/Renting Vs. Owning Ads.mp4
https://www.mnathanvz.online/assets/video/Inner%20SPARC%20Realty%20Corporation/1%20minute%20Video%20Reels%20for%20Savia%20Parkway.mp4	assets/videos/inner-sparc-realty/1 minute Video Reels for Savia Parkway.mp4
https://www.mnathanvz.online/assets/video/Inner%20SPARC%20Realty%20Corporation/Inner%20Sparc%20Realty%20Corporation%20Bank%20Financing%20Ads.mp4	assets/videos/inner-sparc-realty/Inner Sparc Realty Corporation Bank Financing Ads.mp4
https://www.mnathanvz.online/assets/video/Inner%20SPARC%20Realty%20Corporation/Client%20House%20Inspection.mp4	assets/videos/inner-sparc-realty/Client House Inspection.mp4
https://www.mnathanvz.online/assets/video/Inner%20SPARC%20Realty%20Corporation/Tips%20in%20Buying%20Home.mp4	assets/videos/inner-sparc-realty/Tips in Buying Home.mp4
https://www.mnathanvz.online/assets/video/Inner%20SPARC%20Realty%20Corporation/Lancaster%20Townhouse%20Ads.mp4	assets/videos/inner-sparc-realty/Lancaster Townhouse Ads.mp4
https://www.mnathanvz.online/assets/video/Inner%20SPARC%20Realty%20Corporation/Lancaster%20Ads.mp4	assets/videos/inner-sparc-realty/Lancaster Ads.mp4
https://www.mnathanvz.online/assets/video/Inner%20SPARC%20Realty%20Corporation/Reels%20Tiktok.mp4	assets/videos/inner-sparc-realty/Reels Tiktok.mp4
https://www.mnathanvz.online/assets/video/Inner%20SPARC%20Realty%20Corporation/Recruitment%20Video%20%281%29.mp4	assets/videos/inner-sparc-realty/Recruitment Video (1).mp4
https://www.mnathanvz.online/assets/video/Inner%20SPARC%20Realty%20Corporation/Transcripting%20%281%29.mp4	assets/videos/inner-sparc-realty/Transcripting (1).mp4
https://www.mnathanvz.online/assets/video/Rove%20Chem%20Trading/Transcripting%20%282%29.mp4	assets/videos/rove-chem-trading/Transcripting (2).mp4
https://www.mnathanvz.online/assets/video/Inner%20SPARC%20Realty%20Corporation/New%20Lancaster%20City.mp4	assets/videos/inner-sparc-realty/New Lancaster City.mp4
https://www.mnathanvz.online/assets/img/website/riotmusicstudio.png	assets/images/websites/riotmusicstudio.png
https://www.mnathanvz.online/assets/img/website/Wealth%20Optimizer%20Website.png	assets/images/websites/Wealth Optimizer Website.png
https://www.mnathanvz.online/assets/doc/Introduction%20to%20Packet%20Tracer.pdf	assets/documents/certificates/Introduction to Packet Tracer.pdf
https://www.mnathanvz.online/assets/doc/Introduction%20to%20Cybersecurity.pdf	assets/documents/certificates/Introduction to Cybersecurity.pdf
https://www.mnathanvz.online/assets/doc/Valdez%2C%20Marc%20Nathaniel%20M.%20-%20Cloud%20Computing%20and%20DevOps.pdf	assets/documents/certificates/Valdez, Marc Nathaniel M. - Cloud Computing and DevOps.pdf
https://www.mnathanvz.online/assets/doc/Endpoint%20Security.pdf	assets/documents/certificates/Endpoint Security.pdf
https://www.mnathanvz.online/assets/doc/Ethical%20Hacker.pdf	assets/documents/certificates/Ethical Hacker.pdf
https://www.mnathanvz.online/assets/doc/How%20to%20Counter-Act%20when%20Hacked.pdf	assets/documents/certificates/How to Counter-Act when Hacked.pdf
https://www.mnathanvz.online/assets/doc/Querying%20Fundamentals%20with%20MySQL%20Essentials%20for%20Beginners.pdf	assets/documents/certificates/Querying Fundamentals with MySQL Essentials for Beginners.pdf
https://www.mnathanvz.online/assets/doc/PC%20Assembly%20%26%20Disassembly.pdf	assets/documents/certificates/PC Assembly & Disassembly.pdf
https://www.mnathanvz.online/assets/doc/Network%20Defense.pdf	assets/documents/certificates/Network Defense.pdf
https://www.mnathanvz.online/assets/doc/InnerSparcRealtyCertificationRecognitionVideoMaking.pdf	assets/documents/certificates/InnerSparcRealtyCertificationRecognitionVideoMaking.pdf
https://www.mnathanvz.online/assets/doc/Professionalism%20and%20Communication.pdf	assets/documents/certificates/Professionalism and Communication.pdf
https://www.mnathanvz.online/assets/doc/certificate-mkt101-digital-advertising-strategy-foundations-63ebee96da30a43de9049b54.pdf	assets/documents/certificates/certificate-mkt101-digital-advertising-strategy-foundations-63ebee96da30a43de9049b54.pdf
https://www.mnathanvz.online/assets/img/profile-img.png	assets/images/profile/profile-img.png
LIST

echo ""
echo "Done: $downloaded downloaded, $skipped already there, $failed failed."
