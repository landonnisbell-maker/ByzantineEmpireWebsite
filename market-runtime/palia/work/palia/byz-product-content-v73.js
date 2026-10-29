/* V38 — text layout, scratch-edged image placeholders, scroll reveals. No navigation or WebGL modification. */
(function(){
 'use strict';
 const PRODUCTS = {"Paramerion Sword":{"tagline":"Expertly Forged. Beautifully Finished. Made to Last.","html":"<h2 class=\"byz-offering-title\">The Paramerion Sword</h3>\n<p><em>Expertly Forged. Beautifully Finished. Made to Last.</em></p>\n<p>Our paramerion sword is much more than a weapon. It's a piece of craftsmanship, made right here in the Byzantine Empire by our very own master blacksmith, one of the finest in the land.</p>\n<h3 class=\"byz-section-title\">A Sword Worth Carrying</h3>\n<p>Whether you're a traveler looking for a dependable blade, a soldier seeking quality equipment, or simply someone who appreciates fine craftsmanship, our paramerion is made to impress.</p>\n<p>A well-crafted sword is something you can rely on, but it can also be a symbol of pride, accomplishment, and status. And with its rich maroon leather and genuine gold fittings, this is a sword you'll be proud to have at your side.</p>\n<p>Its carefully designed scabbard makes carrying it convenient, whether you're traveling through the streets of Constantinople or preparing for a longer journey.</p>\n<p>Better yet, with proper care, a finely crafted sword can remain a treasured possession for years, perhaps even becoming something you pass down to the next generation.</p>\n<h3 class=\"byz-section-title\">Forged With Strength in Mind</h3>\n<p>Every blade begins with carefully selected iron, worked over a charcoal-fired forge to produce strong, high-quality steel. It is then expertly heated, quenched, and tempered to achieve a dependable balance of strength, hardness, and flexibility.</p>\n<p>And we don't just <em>say</em> our swords are sharp. We put every single blade to the test before it leaves our workshop!</p>\n<p>In our own cutting demonstrations, our blades cleanly slice through <strong>twelve tightly bundled fresh reeds in a single stroke</strong>, while lesser blades we've compared them with manage only six.</p>\n<p>We wouldn't sell you a blade we weren't proud to carry ourselves.</p>\n<h3 class=\"byz-section-title\">Finishing Fit for Royalty</h3>\n<p>The hilt and scabbard are carefully shaped from wood, secured with traditional joinery, sturdy metal pins, and strong hide glue.</p>\n<p>Both feature beautiful maroon leather, complemented by genuine solid-gold fittings that give the sword its unmistakably royal appearance.</p>\n<p>For convenience, the scabbard includes a sturdy leather carrying strap, allowing you to wear your sword comfortably at your hip or across your shoulder.</p>\n<p>Every detail, from the carefully finished blade to the leatherwork, receives the attention it deserves.</p>\n<h3 class=\"byz-section-title\">Exceptional Quality. A Fair Price.</h3>\n<p>We offer this exceptional piece for just <strong>10 gold nomismata (approximately $5,600 USD)</strong>, while competitors charge <strong>12 gold nomismata (approximately $6,720 USD)</strong> for swords made with lesser materials.</p>\n<p>Why settle for something ordinary when you can own a sword made with genuine care and exceptional materials?</p>\n<p><strong>A sword fit for royalty, crafted with pride, and made right here at home.</strong></p>\n"},"Gold Jewelry":{"tagline":"Genuine Gold. Beautiful Details. Made Just for You.","html":"<h2 class=\"byz-offering-title\">Fine Gold Jewelry</h3>\n<p><em>Genuine Gold. Beautiful Details. Made Just for You.</em></p>\n<p>When we say our jewelry is gold, we mean it figuratively and literally!</p>\n<p>Whether you're searching for the perfect gift, celebrating a special occasion, or treating yourself to something beautiful, our jewelry offers a little piece of Byzantine luxury that you can carry wherever you go.</p>\n<h3 class=\"byz-section-title\">Something Beautiful for Every Occasion</h3>\n<p>Jewelry is more than decoration. It's a wonderful way to celebrate the people, moments, and traditions that mean the most to you.</p>\n<p>A beautiful gold ring can commemorate an important occasion or serve as a lasting symbol of affection.</p>\n<p>A pair of finely detailed earrings can bring an elegant finishing touch to your favorite clothing.</p>\n<p>A carefully crafted necklace can become the centerpiece of an outfit, while a meaningful pendant can represent your faith, family, or something personally important to you.</p>\n<p>And unlike garments that may change with fashion, fine jewelry can remain a treasured possession for generations.</p>\n<p>It's a wonderful gift for someone you love and an equally wonderful way to celebrate an achievement of your own.</p>\n<h3 class=\"byz-section-title\">Real Gold, Through and Through</h3>\n<p>Every piece begins with carefully selected, high-purity gold, obtained from trusted precious-metal merchants and genuine gold coins.</p>\n<p>Our experienced goldsmiths carefully refine and work the metal into beautiful, solid-gold jewelry worthy of the finest occasions.</p>\n<p>While some competing merchants sell silver jewelry with only a thin gilding of gold, ours is crafted from genuine, high-purity gold throughout.</p>\n<p>No hidden silver beneath a golden surface, and no compromises on the quality of the metal.</p>\n<p>And because our pieces contain substantial amounts of genuine precious metal, they possess value beyond their decorative appearance, though their future resale value can vary.</p>\n<h3 class=\"byz-section-title\">Fine Details You'll Want to Admire</h3>\n<p>From elegant rings and earrings to beautifully detailed necklaces and pendants, every piece is carefully crafted with delicate patterns, fine inscriptions, and exquisite finishing touches.</p>\n<p>Our craftsmen take particular pride in the smallest details. After all, it's often those little touches that make a piece of jewelry feel truly special.</p>\n<p>Whether you're preparing for a grand celebration or simply want something lovely to complement your favorite outfit, we have something for you.</p>\n<p>Better yet, we offer this level of craftsmanship at <strong>prices comparable to those of other fine solid-gold jewelry merchants</strong>, without settling for gold-gilded alternatives.</p>\n<h3 class=\"byz-section-title\">Your Gold. Your Design.</h3>\n<p><strong>Have gold coins of your own?</strong></p>\n<p>Bring them to us!</p>\n<p>Our goldsmiths can weigh and value your coins, then arrange to turn their gold into a beautiful, personalized piece of jewelry, following the regulations of our craft.</p>\n<p>It's a wonderful way to transform gold you already possess into something meaningful that you can wear, enjoy, or give to someone special.</p>\n<p>We also offer custom engravings, allowing you to add a name, message, or meaningful design.</p>\n<p>Whether it's a treasured family name, a special dedication, or a symbol close to your heart, our craftsmen can help make your jewelry uniquely yours.</p>\n<h3 class=\"byz-section-title\">Our Jewelry Prices</h3>\n<p><strong>Solid-Gold Ring: 2 gold nomismata (approximately $1,120 USD)</strong></p>\n<p><strong>Solid-Gold Earrings (pair): 2 gold nomismata (approximately $1,120 USD)</strong></p>\n<p><strong>Solid-Gold Necklace: 6 gold nomismata (approximately $3,360 USD)</strong></p>\n<p><strong>Solid-Gold Pendant: 1 gold nomisma and 6 silver miliaresia (approximately $840 USD)</strong></p>\n<p><strong>Custom Engraving: 2 silver miliaresia (approximately $93 USD) extra</strong></p>\n<p><strong>Made from real gold, crafted with care, and made personal to you.</strong></p>\n"},"Food Items":{"tagline":"Fresh from the Coast. Carefully Made. Rich in Flavor.","html":"<h2 class=\"byz-offering-title\">Traditional Garos Fish Sauce</h3>\n<p><em>Fresh from the Coast. Carefully Made. Rich in Flavor.</em></p>\n<p>We believe a wonderful fish sauce begins with wonderful fish.</p>\n<p>That's why we work closely with some of the finest local fishermen, who bring us only their freshest, highest-quality catches from the coast.</p>\n<p>We don't settle for second-best, and neither should you!</p>\n<h3 class=\"byz-section-title\">A Little Sauce. A Wonderful Difference.</h3>\n<p>Want to bring a little more flavor to your favorite meals?</p>\n<p>Our traditional garos is a wonderful addition to the kitchen, bringing a deep, rich, savory taste to all sorts of dishes.</p>\n<p>A little garos can add wonderful depth to soups, stews, fish dishes, vegetables, and even simple meals of beans or lentils.</p>\n<p>It adds a distinctive savory character that can make familiar recipes feel more satisfying without requiring a long list of extra ingredients.</p>\n<p>Whether you're preparing a family meal, entertaining guests, or simply looking for something to make your everyday cooking more enjoyable, a jar of garos is a useful addition to your kitchen.</p>\n<p>And because its flavor is concentrated, a little can go a long way!</p>\n<p><strong>Sometimes, it's the smallest addition that makes the biggest difference.</strong></p>\n<h3 class=\"byz-section-title\">Made in Small Batches. Never Rushed.</h3>\n<p>Once the fish reaches us, we prepare our traditional garos in carefully managed, small batches.</p>\n<p>Using salt and traditional fermentation methods, we allow the ingredients time to develop the rich, savory flavor that has made this sauce a favorite at Byzantine tables.</p>\n<p>Every batch receives our personal attention throughout the process.</p>\n<p>Before a single jar reaches your table, we carefully inspect and sample it to ensure it meets our standards for quality and flavor.</p>\n<p>We don't believe in rushing good food or sacrificing quality just to make more of it.</p>\n<h3 class=\"byz-section-title\">Bring a Taste of the Coast Home</h3>\n<p>Whether you're preparing a favorite family recipe or experimenting with something new, we're proud to offer a sauce that brings the rich culinary traditions of the Mediterranean into your kitchen.</p>\n<p><strong>Price: 4 copper folles (approximately $7.80 USD) per 250 mL jar</strong></p>\n<p><strong>Freshly selected, thoughtfully prepared, and made with a little extra care in every jar.</strong></p>\n<h2 class=\"byz-offering-title\">Traditional Cretan Apáki</h3>\n<p><em>From the Mountains of Crete to Your Table.</em></p>\n<p>Great Apáki begins long before the meat reaches our workshop.</p>\n<p>From the farmers who raise the pigs to the craftsmen who prepare and smoke the pork, every step is treated with genuine care.</p>\n<p>And we think you'll be able to appreciate that care in every flavorful bite!</p>\n<h3 class=\"byz-section-title\">Something Special for Your Table</h3>\n<p>Whether you're preparing a hearty family meal, welcoming guests, or simply looking for a flavorful alternative to ordinary pork, our traditional Cretan Apáki is a wonderful choice.</p>\n<p>The careful marinating and smoking process gives the meat a deep, distinctive flavor that makes it an excellent addition to a variety of cooked dishes.</p>\n<p>Try it as part of a hearty stew, combine it with vegetables, or prepare it alongside your favorite breads and other traditional foods.</p>\n<p>Its savory, aromatic character also makes it a lovely choice for a special meal shared with family and friends.</p>\n<p>And because the pork is carefully marinated and smoked, it offers a different flavor experience from ordinary freshly prepared meat.</p>\n<p><strong>Why settle for an everyday meal when you can bring a little taste of Crete to your table?</strong></p>\n<h3 class=\"byz-section-title\">Raised With Care in the Cretan Highlands</h3>\n<p>We work with trusted farmers from the beautiful highlands of Crete, near Mount Ida, where pigs are carefully raised until they reach a healthy, fully grown size.</p>\n<p>Once ready, they're brought by their herders to our local Cretan workshop, where we take care of the rest of the preparation ourselves.</p>\n<p>We take pride in knowing where our ingredients come from and in working with farmers who share our respect for quality.</p>\n<h3 class=\"byz-section-title\">Five Days of Flavor</h3>\n<p>First, we carefully cut the pork into strips and marinate them for <strong>five full days</strong> in our very own blend of high-quality wine vinegar and carefully selected spices.</p>\n<p>This gives the meat plenty of time to absorb the rich, distinctive flavors that make our Apáki so special.</p>\n<p>Once marinated, we hand-press aromatic herbs, including thyme, sage, and oregano, into each strip, adding another wonderful layer of flavor before the smoking begins.</p>\n<h3 class=\"byz-section-title\">Slowly Smoked. Carefully Finished.</h3>\n<p>The strips are then hung in our traditional smoker for <strong>6 to 12 hours of gentle, carefully monitored smoking</strong>.</p>\n<p>We regularly tend the fire and inspect the meat throughout the process, using locally sourced olive wood and fragrant herbs to give each batch its wonderfully distinctive aroma.</p>\n<p>It's a lengthy process, but one we're proud to take our time with.</p>\n<p>From the farmers who raise the pigs to the final preparation in our workshop, every step reflects our dedication to genuine Cretan craftsmanship.</p>\n<p>Once finished, our Apáki makes its way from our Cretan workshop to our marketplace, bringing a little taste of the island to your table.</p>\n<h3 class=\"byz-section-title\">A Taste Worth Sharing</h3>\n<p>Our Apáki is more than just a flavorful addition to a meal. It's an opportunity to bring the culinary traditions and rich flavors of Crete into your own home.</p>\n<p>Whether it's served during a special gathering or enjoyed as part of an ordinary family dinner, we're proud to share something made with such care.</p>\n<p><strong>Price: 8 copper folles (approximately $15.60 USD) per 250 g portion</strong></p>\n<p><strong>Slowly prepared, rich in flavor, and made with pride.</strong></p>\n"},"Coin Exchange Service":{"tagline":"Your Money. Your Choice. Every Coin Accounted For.","html":"<h2 class=\"byz-offering-title\">Coin Exchange</h3>\n<p><em>Your Money. Your Choice. Every Coin Accounted For.</em></p>\n<p>Have too many gold coins in your purse, but need something smaller for your everyday purchases?</p>\n<p>We've got you covered!</p>\n<h3 class=\"byz-section-title\">The Right Coins for Every Purchase</h3>\n<p>Gold nomismata are wonderful when making large purchases, paying significant expenses, or keeping your wealth in a valuable, convenient form.</p>\n<p>But what happens when you want to buy something small, such as a jar of fish sauce, a little food from the market, or an inexpensive household necessity?</p>\n<p>That's where smaller coins come in!</p>\n<p>By exchanging your gold for silver miliaresia or copper folles, you can carry denominations better suited to everyday purchases.</p>\n<p>No need to find a merchant who can give change for your gold, and no need to worry about carrying more valuable coins than your purchases require.</p>\n<p>Whether you're preparing for a day at the market or simply organizing your money, our service makes spending a little more convenient.</p>\n<h3 class=\"byz-section-title\">Your Money Should Stay Yours</h3>\n<p>Through our trusted money-changing partner, you can exchange your gold nomismata for silver miliaresia or copper folles.</p>\n<p>Unlike money-changers who take a portion of your exchange as a fee, we believe your money should stay yours.</p>\n<p>That's why we offer <strong>100% of your coins' proper exchange value, with absolutely no commission or hidden charges!</strong></p>\n<p>You receive the full equivalent value of your genuine coins according to the exchange denominations available.</p>\n<p>It's a simple service, but one that can save you money every time you need smaller currency.</p>\n<h3 class=\"byz-section-title\">Simple, Convenient, and Fair</h3>\n<p>Simply bring us your coins, tell us which denominations you'd like, and we'll carefully examine and count them before exchanging them at their proper value, subject to the smaller coins we have available.</p>\n<p>And if you're visiting our marketplace to shop, you can exchange your money and continue browsing without having to search the city for another money-changer.</p>\n<p>This is our little way of thanking you for shopping with us!</p>\n<h3 class=\"byz-section-title\">Our Exchange Fee</h3>\n<p><strong>Absolutely FREE! 0% commission!</strong></p>\n<p>For example, exchanging <strong>1 gold nomisma</strong> could provide <strong>12 silver miliaresia or 288 copper folles</strong>, using our marketplace's conventional accounting rates, without any deductions.</p>\n<p><strong>No unnecessary fees. No unpleasant surprises. Just fair, friendly service from neighbors you can trust.</strong></p>\n"},"Silk Textiles":{"tagline":"The Finest Silk. The Finest Craftsmanship. Made Right Here at Home.","html":"<h2 class=\"byz-offering-title\">Byzantine Silk Cloaks &amp; Rugs</h3>\n<p><em>The Finest Silk. The Finest Craftsmanship. Made Right Here at Home.</em></p>\n<p>For centuries, the finest silks traveled from the distant lands of China, carried across the legendary Silk Road before finally reaching the markets of Constantinople.</p>\n<p>But times have changed, and so have we!</p>\n<p>During the reign of Emperor Justinian, travelers brought knowledge of a remarkable secret: the methods used to produce silk from silkworms. Since then, Byzantine craftsmen have become renowned for transforming precious silk into some of the most beautiful textiles in the world.</p>\n<p><strong>So why wait for finished cloaks and rugs to make the long journey along the Silk Road when our own skilled artisans can weave them right here at home?</strong></p>\n<p>We proudly offer two luxurious silk products, each with its own special purpose.</p>\n<h3 class=\"byz-section-title\">Our Silk Cloak: Elegance You Can Wear</h3>\n<p>Looking for something that makes an impression the moment you enter a room?</p>\n<p>Our beautiful silk cloaks are perfect for special occasions, important gatherings, ceremonies, or simply adding an unmistakable touch of luxury to your everyday wardrobe.</p>\n<p>The smooth, finely woven silk drapes comfortably around your shoulders, offering a light and elegant outer layer without the heavy feeling of thicker garments.</p>\n<p>Its rich colors and delicate golden-colored silk accents make it a wonderful choice for anyone wishing to express their personal style, prosperity, or appreciation for fine Byzantine fashion.</p>\n<p>And because beautiful clothing deserves to be worn more than once, we design our cloaks to be pieces you'll want to bring out for many special occasions to come.</p>\n<p><strong>Why simply dress for an occasion when you can make the occasion memorable?</strong></p>\n<h3 class=\"byz-section-title\">Our Silk Rug: Bring Luxury Into Your Home</h3>\n<p>Your home is where you welcome family, entertain guests, and enjoy the comforts of everyday life. Why not make it somewhere truly special?</p>\n<p>Our finely woven silk rugs bring warmth in appearance, color, and intricate beauty to your favorite rooms.</p>\n<p>Whether displayed in a welcoming reception room, placed in a quiet chamber, or used as a beautiful decorative centerpiece, their rich patterns can transform an otherwise ordinary space into something remarkable.</p>\n<p>The delicate weaving and carefully selected colors create wonderful details for guests to admire, while the silk's natural sheen catches the light and brings the patterns to life.</p>\n<p>A fine rug isn't simply something to place on the floor. It's a reflection of your home, your hospitality, and the care you put into the things you own.</p>\n<p><strong>A beautiful home deserves beautiful craftsmanship.</strong></p>\n<h3 class=\"byz-section-title\">Woven Locally. Made With Care.</h3>\n<p>We carefully select the finest silk available from trusted merchants, then bring it straight to our local workshops, where our talented weavers take over.</p>\n<p>Every cloak and rug is thoughtfully crafted with attention to even the smallest details, including delicate golden-colored silk accents that add a wonderful touch of luxury.</p>\n<p>And because we weave our products locally, we're able to take a personal interest in every piece, carefully checking the craftsmanship before it reaches your hands.</p>\n<p>We believe beautiful craftsmanship should never be rushed. While other merchants may hurry through their weaving to sell more products, we take the time to make each piece something truly special.</p>\n<p>Our merchants also take care of any required declarations for qualifying luxury silk garments, following the regulations of Constantinople's trade officials.</p>\n<h3 class=\"byz-section-title\">Beautiful Craftsmanship at a Fair Price</h3>\n<p><strong>Our Silk Cloak: 12 gold nomismata (approximately $6,720 USD)</strong></p>\n<p><strong>Competitor's Silk Cloak: 14 gold nomismata (approximately $7,840 USD)</strong></p>\n<p><strong>Our Silk Rug: 15 gold nomismata (approximately $8,400 USD)</strong></p>\n<p><strong>Competitor's Silk Rug: 18 gold nomismata (approximately $10,080 USD)</strong></p>\n<p>Our handcrafted silk products are offered at competitive prices, while merchants selling comparable luxury fabrics may charge more for work that lacks the same attention to detail.</p>\n<p>Here at <em>ta pánta pazári</em>, we believe in a simple saying:</p>\n<p><strong>Quality over quantity. Always.</strong></p>\n"}};
 const PURCHASE = "If you want to buy any of these products, talk to the market owners, who will help you complete your purchase.";
 const SINGLE_OFFERINGS=new Set(['Paramerion Sword','Gold Jewelry','Coin Exchange Service']);
 const EXTRA_MEDIA={
   'Silk Textiles':{cloak:'/ByzantineEmpireWebsite/market-runtime/product-images/details/silk-cloak-feature-v73.webp'}
 };
 let activeProduct=window.__BYZ_ACTIVE_PRODUCT_TITLE__||null;
 let scheduled=false;
 let currentArticle=null;
 let revealObserver=null;
 function makePhotoSlot(number){
   return null;
 }
 function escapeHtml(value){
   return String(value).replace(/[&<>"']/g,function(ch){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]);});
 }
 function scratchFigureMarkup(config){
   const title=config.title?'<strong>'+escapeHtml(config.title)+'</strong>':'';
   const body=config.body?'<span>'+escapeHtml(config.body)+'</span>':'';
   const meta=config.meta?'<em>'+escapeHtml(config.meta)+'</em>':'';
   const imgClass=['byz-market-supplied-photo'];
   if(config.imgClass)imgClass.push(config.imgClass);
   const img=config.src?'<img class="'+imgClass.join(' ')+'" src="'+config.src+'" alt="'+escapeHtml(config.alt||config.title||'')+'" loading="'+(config.loading||'lazy')+'" decoding="async"'+(config.fetchpriority?' fetchpriority="'+config.fetchpriority+'"':'')+' />':'';
   const placeholder=!config.src?'<div class="byz-market-image-placeholder">'+title+body+meta+'</div>':'';
   const caption=config.caption?'<figcaption class="byz-market-scratch-caption">'+config.caption+'</figcaption>':'';
   const classes=['byz-market-scratch-figure'];
   const surfaceClasses=['byz-market-scratch-surface'];
   if(config.className)classes.push(config.className);
   if(config.surfaceClass)surfaceClasses.push(config.surfaceClass);
   if(config.reveal!==false)classes.push('byz-reveal-ready');
   return '<figure class="'+classes.join(' ')+'"><div class="'+surfaceClasses.join(' ')+'">'+img+placeholder+'</div>'+caption+'</figure>';
 }
 function buildDefaultArticle(article,item){
   article.classList.remove('byz-market-product-copy--silk');
   if(revealObserver){revealObserver.disconnect();revealObserver=null;}
   const source=document.createElement('div');
   // Product descriptions are pre-authored static content, never user-supplied HTML.
   source.innerHTML=item.html.replace(/(<h2[^>]*>[^<]*)<\/h3>/g,'$1</h2>');
   const first=source.firstElementChild;
   if(first && first.classList.contains('byz-offering-title') && SINGLE_OFFERINGS.has(activeProduct))first.remove();
   // The first slogan now appears under the single hero heading, not again in the article.
   const firstP=source.querySelector('p');
   if(firstP && firstP.textContent.trim()===item.tagline)firstP.remove();
   const reading=document.createElement('div');reading.className='byz-market-reading';
   const children=Array.from(source.children);
   let paragraphs=0,photos=0;
   for(let i=0;i<children.length;i++){
     const node=children[i], next=children[i+1];
     reading.appendChild(node);
     if(node.tagName==='P' && !node.querySelector('strong:only-child'))paragraphs++;
     const nextHeading=!!(next && /^H[23]$/.test(next.tagName));
     const hasMore=children.slice(i+1).some(e=>e.tagName==='P'&&!e.querySelector('strong:only-child'));
     // Put illustrations between passages or section boundaries, never in pricing lists.
     if(hasMore && ((nextHeading && paragraphs>=3)||(paragraphs>=5 && !nextHeading))){
       photos++;var slot=makePhotoSlot(photos);if(slot)reading.appendChild(slot);paragraphs=0;
     }
   }
   const purchase=document.createElement('aside');purchase.className='byz-market-purchase';
   purchase.setAttribute('aria-label','How to buy');purchase.textContent=PURCHASE;
   article.replaceChildren(reading,purchase);
   article.dataset.product=activeProduct;
   startReveals(article);
 }
 function buildSilkArticle(article,item){
   article.classList.add('byz-market-product-copy--silk');
   if(revealObserver){revealObserver.disconnect();revealObserver=null;}
   const cloak=(EXTRA_MEDIA['Silk Textiles']||{}).cloak||'';
   const introFigure=scratchFigureMarkup({
     src:cloak,alt:'Purple and red Byzantine silk cloak on a mannequin',loading:'eager',fetchpriority:'high',
     className:'byz-market-scratch-figure--portrait',
     surfaceClass:'byz-market-scratch-surface--contain byz-market-scratch-surface--feather-strong',
     imgClass:'byz-market-supplied-photo--contain',
     caption:'Handcrafted silk cloak featuring deep purple outer silk, crimson lining, and gold Byzantine-inspired detailing.'
   });
   const bannerFigure=scratchFigureMarkup({
     title:'Placeholder — Lifestyle Silk Cloak Banner',
     body:'Need image: a person wearing the silk cloak in a refined Byzantine interior, with elegant architecture and warm ceremonial lighting. Recommended aspect ratio: 21:9. Placement: full-width story banner.',
     meta:'Image needed · 21:9 · full-width banner',
     className:'byz-market-scratch-figure--wide'
   });
   const rugFigure=scratchFigureMarkup({
     title:'Placeholder — Silk Rug in Interior',
     body:'Need image: the silk rug styled inside a luxurious Byzantine room, shown in a three-quarter room view with the rug clearly visible. Recommended aspect ratio: 5:4. Placement: split rug showcase section.',
     meta:'Image needed · 5:4 · rug showcase',
     className:'byz-market-scratch-figure--room'
   });
   const closeupCloak=scratchFigureMarkup({
     title:'Placeholder — Cloak Embroidery Close-Up',
     body:'Need image: close crop of the gold architectural embroidery along the cloak collar. Recommended aspect ratio: 1:1. Placement: craftsmanship gallery.',
     meta:'Image needed · 1:1 · close-up detail',
     className:'byz-market-scratch-figure--square byz-market-scratch-figure--gallery'
   });
   const silkMacro=scratchFigureMarkup({
     title:'Placeholder — Silk Weave Macro',
     body:'Need image: a macro shot showing the silk weave, sheen, and fine surface pattern. Recommended aspect ratio: 1:1. Placement: craftsmanship gallery.',
     meta:'Image needed · 1:1 · material macro',
     className:'byz-market-scratch-figure--square byz-market-scratch-figure--gallery'
   });
   const rugDetail=scratchFigureMarkup({
     title:'Placeholder — Rug Border Detail',
     body:'Need image: close-up of the silk rug border and stitching, showing its intricate pattern. Recommended aspect ratio: 1:1. Placement: craftsmanship gallery.',
     meta:'Image needed · 1:1 · rug detail',
     className:'byz-market-scratch-figure--square byz-market-scratch-figure--gallery'
   });
   const root=document.createElement('div');
   root.className='byz-silk-experience byz-market-reading';
   root.innerHTML=''
   +'<section class="byz-silk-section byz-reveal-ready">'
     +'<div class="byz-silk-copy">'
       +'<span class="byz-silk-eyebrow">Wearable Luxury</span>'
       +'<h2>Our Silk Cloak: Elegance You Can Wear</h2>'
       +'<p>Looking for something that makes an impression the moment you enter a room? Our beautiful silk cloaks are perfect for special occasions, important gatherings, ceremonies, or simply adding an unmistakable touch of luxury to your everyday wardrobe.</p>'
       +'<p>The smooth, finely woven silk drapes comfortably around your shoulders, offering a light and elegant outer layer without the heavy feeling of thicker garments. Its rich colors and delicate golden-colored silk accents make it a wonderful choice for anyone wishing to express personal style, prosperity, or an appreciation for fine Byzantine fashion.</p>'
       +'<p>Because beautiful clothing deserves to be worn more than once, we design our cloaks to be pieces you will want to bring out for many special occasions to come.</p>'
       +'<div class="byz-silk-quote">Why simply dress for an occasion when you can make the occasion memorable?</div>'
     +'</div>'
     +'<div class="byz-silk-visual">'+introFigure+'</div>'
   +'</section>'
   +'<section class="byz-silk-banner byz-reveal-ready">'
      +bannerFigure
      +'<div class="byz-silk-banner-copy">'
        +'<h3>From Silk Road rarity to local prestige</h3>'
        +'<p>For centuries, the finest silks traveled from distant lands before reaching Constantinople. Now, luxury does not have to feel distant. This section is designed for a cinematic lifestyle banner that introduces the cloak as an object of beauty, status, and atmosphere.</p>'
      +'</div>'
   +'</section>'
   +'<section class="byz-silk-section byz-silk-section--reverse byz-reveal-ready">'
     +'<div class="byz-silk-copy">'
       +'<span class="byz-silk-eyebrow">For the Home</span>'
       +'<h2>Silk rugs that transform a room</h2>'
       +'<p>If you want something in your home that guests will notice immediately, our silk rugs are made for exactly that purpose. Whether placed in a reception room, private chamber, or used as a decorative centerpiece, their rich patterns transform a space into something remarkable.</p>'
       +'<p>The delicate weaving and carefully selected colors create details for guests to admire, while the silk’s natural sheen catches the light and brings the patterns to life. A fine rug is not simply something to place on the floor — it is a reflection of your home, your hospitality, and the care you put into the things you own.</p>'
       +'<p><strong>A beautiful home deserves beautiful craftsmanship.</strong></p>'
     +'</div>'
     +'<div class="byz-silk-visual">'+rugFigure+'</div>'
   +'</section>'
   +'<section class="byz-silk-feature-grid">'
      +'<article class="byz-silk-card byz-reveal-ready"><span class="byz-silk-card-number">01</span><h3>Woven locally</h3><p>We carefully select fine silk from trusted merchants and bring it directly to our own local workshops.</p><p>No more waiting on the Silk Road for every finished luxury garment. The weaving and finishing happen close to home, where every stage can be personally inspected.</p></article>'
      +'<article class="byz-silk-card byz-reveal-ready"><span class="byz-silk-card-number">02</span><h3>Golden accents, careful details</h3><p>Every cloak and rug is thoughtfully crafted with attention to the smallest visual details, including golden-colored silk accents that add a refined, premium finish.</p></article>'
      +'<article class="byz-silk-card byz-reveal-ready"><span class="byz-silk-card-number">03</span><h3>Luxury handled properly</h3><p>Our merchants also take care of required declarations for qualifying luxury silk garments, following the regulations of Constantinople’s trade officials.</p></article>'
   +'</section>'
   +'<section class="byz-silk-gallery">'
      +'<div class="byz-reveal-ready">'+closeupCloak+'</div>'
      +'<div class="byz-reveal-ready">'+silkMacro+'</div>'
      +'<div class="byz-reveal-ready">'+rugDetail+'</div>'
   +'</section>'
   +'<section class="byz-silk-pricing">'
      +'<div class="byz-silk-pricing-copy byz-reveal-ready">'
         +'<span class="byz-silk-eyebrow">Value & Comparison</span>'
         +'<h2>Beautiful craftsmanship at a fair price</h2>'
         +'<p>Our handcrafted silk products are offered at competitive prices, while merchants selling comparable luxury fabrics may charge more for work that lacks the same attention to detail. At <em>ta pánta pazári</em>, we believe in a simple rule: quality over quantity. Always.</p>'
      +'</div>'
      +'<div class="byz-silk-price-grid">'
         +'<article class="byz-silk-price-card byz-reveal-ready"><span class="byz-silk-price-kicker">Featured garment</span><h3>Silk cloak</h3><span class="byz-silk-price">12 gold nomismata</span><p>Approximately $6,720 USD.</p><ul><li>Competitor price: 14 gold nomismata (approximately $7,840 USD)</li><li>Lightweight, ceremonial, and designed to be worn repeatedly</li><li>Ideal for gatherings, celebrations, and standout presentation</li></ul></article>'
         +'<article class="byz-silk-price-card byz-reveal-ready"><span class="byz-silk-price-kicker">Featured home piece</span><h3>Silk rug</h3><span class="byz-silk-price">15 gold nomismata</span><p>Approximately $8,400 USD.</p><ul><li>Competitor price: 18 gold nomismata (approximately $10,080 USD)</li><li>Decorative centerpiece for high-status interiors</li><li>Designed to add warmth, richness, and visual prestige</li></ul></article>'
      +'</div>'
   +'</section>'
   +'<section class="byz-silk-story">'
      +'<div class="byz-silk-story-copy byz-reveal-ready">'
         +'<span class="byz-silk-eyebrow">Why it matters</span>'
         +'<h2>Designed like a premium shopping experience</h2>'
         +'<p>This product page is intentionally structured as a visual journey rather than a plain block of text. Visitors move from wearable luxury, to home styling, to craftsmanship, to pricing, and finally to the historical and practical value behind the product.</p>'
         +'<p>Where additional imagery would strengthen the experience, the page now reserves clear placeholders so you can create the missing visuals without weakening the design.</p>'
      +'</div>'
      +'<aside class="byz-silk-story-panel byz-reveal-ready">'
          +'<h3>Images still needed for the final silk page</h3>'
          +'<p>The page is now designed for richer storytelling. To finish it, these visual slots still need artwork or product photos:</p>'
          +'<ul class="byz-needed-assets">'
             +'<li>Lifestyle cloak banner — 21:9, cloak worn in a Byzantine interior</li>'
             +'<li>Silk rug showcase — 5:4, rug placed in an elegant room</li>'
             +'<li>Cloak embroidery close-up — 1:1, collar and gold details</li>'
             +'<li>Silk weave macro — 1:1, texture and sheen</li>'
             +'<li>Rug border detail — 1:1, stitching and patterned edge</li>'
          +'</ul>'
      +'</aside>'
   +'</section>';
   const purchase=document.createElement('aside');purchase.className='byz-market-purchase byz-reveal-ready';
   purchase.setAttribute('aria-label','How to buy');purchase.textContent=PURCHASE;
   article.replaceChildren(root,purchase);
   article.dataset.product=activeProduct;
   startReveals(article);
 }
 function buildArticle(article,item){
   if(activeProduct==='Silk Textiles')return buildSilkArticle(article,item);
   return buildDefaultArticle(article,item);
 }
 function startReveals(article){
   const nodes=[...article.querySelectorAll('.byz-reveal-ready, .byz-market-reading > p, .byz-market-reading > h2, .byz-market-reading > h3, .byz-market-reading > figure, .byz-market-purchase')];
   const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   for(const n of nodes)n.classList.add('byz-reveal-ready');
   if(reduced || !('IntersectionObserver' in window)){
     for(const n of nodes)n.classList.add('byz-revealed');
     return;
   }
   function revealVisible(){
     const limit=window.innerHeight*.96;
     for(const n of nodes){
       if(n.classList.contains('byz-revealed'))continue;
       const r=n.getBoundingClientRect();
       if(r.top<limit && r.bottom>0){
         n.classList.add('byz-revealed');
         if(revealObserver)revealObserver.unobserve(n);
       }
     }
   }
   revealObserver=new IntersectionObserver(entries=>{
     for(const e of entries){
       if(e.isIntersecting){
         e.target.classList.add('byz-revealed');
         revealObserver.unobserve(e.target);
       }
     }
   },{threshold:.06,rootMargin:'0px 0px -8% 0px'});
   nodes.forEach(n=>revealObserver.observe(n));
   requestAnimationFrame(()=>requestAnimationFrame(revealVisible));
 }
 const BYZ_PRODUCT_IMAGE={
   'Paramerion Sword':'/ByzantineEmpireWebsite/market-runtime/product-images/paramerion-sword.webp',
   'Gold Jewelry':'/ByzantineEmpireWebsite/market-runtime/product-images/gold-jewelry.webp',
   'Food Items':'/ByzantineEmpireWebsite/market-runtime/product-images/food-items.webp',
   'Coin Exchange Service':'/ByzantineEmpireWebsite/market-runtime/product-images/coins.webp',
   'Silk Textiles':'/ByzantineEmpireWebsite/market-runtime/product-images/silk-textiles.webp'
 };
 function syncHeroMedia(page){
   // V68: The original Palia WebGL banner owns the image and its feathering.
   // Ensure old V61-V67 DOM-photo elements never cover the GPU surface.
   page.querySelectorAll('.byz-product-hero-photo-v61,.byz-product-hero-backdrop-v65,.byz-hero-stage-v66').forEach(function(el){el.remove();});
   const key=activeProduct==='Coins'?'Coin Exchange Service':activeProduct;
   const slug=({
     'Paramerion Sword':'paramerion-sword',
     'Gold Jewelry':'gold-jewelry',
     'Food Items':'food-items',
     'Coin Exchange Service':'coins',
     'Silk Textiles':'silk-textiles'
   })[key];
   if(!slug)return;
   const mobile=window.innerWidth<=720;
   const url='/ByzantineEmpireWebsite/market-runtime/product-images/banners/'+slug+'-'+(mobile?'mobile':'desktop')+'.webp';
   if(window.__BYZ_NATIVE_PALIA_HERO_V68__!==url){
     window.__BYZ_NATIVE_PALIA_HERO_V68__=url;
     window.dispatchEvent(new Event('byz:palia:hero-source-v68'));
   }
 }
 function apply(){
   const item=PRODUCTS[activeProduct];if(!item)return;
   const page=document.querySelector('.work-detail .page');if(!page)return;
   const intro=page.querySelector('.hero__intro'), heading=intro?.querySelector('.hero__heading');
   const blocks=page.querySelector('.blocks.content');
   if(!intro || !heading || !blocks)return;
   syncHeroMedia(page);
   // One H1 and one italic tagline, both in the centered hero caption.
   const h=heading.querySelector('h1.hero__title');
   if(h && h.textContent.trim()!==activeProduct)h.textContent=activeProduct;
   let tagline=heading.querySelector('.byz-market-tagline');
   if(!tagline){tagline=document.createElement('p');tagline.className='byz-market-tagline';heading.appendChild(tagline);}
   if(tagline.textContent!==item.tagline)tagline.textContent=item.tagline;
   intro.querySelectorAll(':scope > .byz-market-tagline').forEach(el=>el.remove());
   let article=page.querySelector('.byz-market-product-copy');
   if(!article){article=document.createElement('article');article.className='byz-market-product-copy';article.setAttribute('aria-label','Product details');blocks.insertAdjacentElement('afterend',article);}
   if(article.dataset.product!==activeProduct){
     if(currentArticle && currentArticle._byzSignal)currentArticle._byzSignal.abort();
     article._byzSignal=new AbortController(); currentArticle=article;
     buildArticle(article,item);
   }
   document.documentElement.classList.add('byz-market-copy-ready');
   // Notify the persistent market shell only after the actual product copy exists.
   // This keeps V66's corrected coin-selection handshake without altering the Palia DOM.
   if(window.parent!==window && window.__BYZ_V67_APPLIED_PRODUCT__!==activeProduct){
     window.__BYZ_V67_APPLIED_PRODUCT__=activeProduct;
     window.parent.postMessage({type:'byz:palia:v66-applied',title:activeProduct},location.origin);
   }
 }
 function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;apply();});}
 window.__BYZ_MARKET_CONTENT_SET__=function(name){
   if(!Object.prototype.hasOwnProperty.call(PRODUCTS,name))return;
   activeProduct=name;window.__BYZ_ACTIVE_PRODUCT_TITLE__=name;schedule();
 };
 function install(){
   window.addEventListener('resize',schedule,{passive:true});
   schedule();const host=document.getElementById('__nuxt')||document.body;
   if(host)new MutationObserver(schedule).observe(host,{subtree:true,childList:true});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
 if(activeProduct)schedule();
})();
