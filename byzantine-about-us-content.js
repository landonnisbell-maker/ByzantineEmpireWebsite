/*
  BYZANTINE EMPIRE — CRYSTAL 2: ABOUT US
  =====================================
  THIS IS THE FILE TO EDIT WHEN YOU WANT TO CHANGE THE ABOUT US PAGE.

  Edit the text between the backticks (`...`) for each section below.
  Keep the section names, surrounding punctuation, and the final script intact.
  Save the file and commit/push it to your existing GitHub repository.
  Refresh the website with Ctrl+Shift+R to see your changes.

  The existing "No image supplied yet" hero and gallery remain unchanged.
  The site uses the text below in its original 3D scrolling interior layout.
*/
(function () {
  'use strict';

  const sections = [
    {
      heading: 'Time Frame',
      body: `330 CE - 1453 CE`
    },
    {
      heading: 'Location',
      body: `The Byzantine Empire was centered at Constantinople or the triangular peninsula strategically placed between Europe and Asia, however it quickly expanded and reached most of the land surrounding the Mediterranean sea. Including, modern day Italy, Greece, Turkey, along with some areas of North Africa and the Middle East.`
    },
    {
      heading: 'Government',
      body: `The Byzantine Empire was ruled by an emperor, and many other officials who worked in finances, military, bureaucracy, judiciary, etc. Senators, ministers, and councillors were given their position by imperial patronage or because of their status. The Byzantine Emperor/Empress dominated as a monarch and was the commander for the army and head of Church and government. They had the power to appoint or dismiss nobles, grant them wealth, control state finances, and more. The Senate acted as the forum of government and they were mainly made of aristocratic males that acquired their position through the emperor. Technically the emperor could make any decisions, however, he was supposed to consult the Senate and senior senators that were known as the sacrum consistorium. Things like declarations of war, alliances, treaties, etc. were supposed to be run by the Senate and senior senators`
    },
    {
      heading: 'Economy',
      body: `The Byzantine economy was one of the most advanced and resilient economic systems in the Mediterranean world, primarily through their vibrant trade and centralized state control. The power of the Byzantine Empire’s economy was largely predicated upon agriculture and trading. Constantinople acted as the primary, largest trading hub present in the Byzantine empire. The government tightly regulated commerce by placing strict controls on internal profit margins, trade guilds, and the export of strategic goods like luxury silk, gold, and weapons. Furthermore, the Byzantine empire introduced the gold solidus, which remained a trusted, stable currency across international trade for centuries. However major crises such as the Plague of Justinian, Arab conquest and the fall of Constantinople, eroded imperial wealth and eventually led to the decline of the Byzantine Empire’s economy`
    },
    {
      heading: 'Religion',
      body: `In A.D. 330, Constantine I (Roman Emperor) chose Byzantium to be the setting of a “New Rome” with the capital city, Constantinople. Five years earlier, Constantine established Christianity to be the official Rome religion in front of the Council of Nicea. The council of Chalcedon in 451 established the division of the Christian religion into separate patriarchates, (this included Rome where the patriarch would later be called pope) Alexandria, Jerusalem, and Antioch. Even after the fall of the Byzantine Empire, the civilization’s culture continued to influence countries that practiced the Eastern Orthodox religion. This included Russia, Romania, Serbia, Bulgaria, Greece, etc.`
    },
    {
      heading: 'Important Cities',
      body: `Alexandria, Jerusalem, Nicea, Constantinople, Athens, Thessaloniki, Ravenna, Damascus, Cappadocia, etc.`
    },
    {
      heading: 'Major Achievements',
      body: `The Hagia Sophia is one of the greatest achievements from the Byzantine Empire, with it being one of the world’s most innovative architectural buildings. The building can still be found in Istanbul, Turkey and it has a variety of religious and cultural identities. It was constructed thousands of years ago, and yet its position has not been fixed. It has recently been converted from a museum back to a mosque which has caused some controversy. However, the Hagia Sophia is not the only major achievement for the Byzantine Empire, they also have many innovations that are still very well known. One of the inventions is the pendentive dome which is the design that is inside of the Hagia Sophia. It is now a construction solution that can allow a circular dome to be built above a rectangular floor plan. The original Hagia Sophia structure had a much smaller dome, but it was burned down during the Nika Riot of 532 along with many other structures. Emperor Justinian the Great (r. 527-565) set to have it rebuilt along with the other structures, and he wanted it to be a larger structure with a dome higher than everything else.`
    },
    {
      heading: 'Important Resources',
      body: `The Byzantine empire relied on agricultural staples, luxuries like imperial silk, and strategic trade goods to sustain its economy and power. The Byzantine empire relied on agricultural products such as wheat, grain, olive oil, wine, livestock, fish, etc. These agriculture items, primarily sourced from fertile regions like Egypt, were imperative to feed the massive urban population of Constantinople. Also, luxury goods such as silk, ceramics, glassware and google coinage were all primary sources of wealth, stability and diplomatic leverage. Raw materials such as timber, metals, spices, perfumes, fur, amber and ivory were all crucial for constructing the formidable Byzantine empire and architectural wonders like the Hagia Sophia.`
    },
    {
      heading: 'Trade connections',
      body: `As Constantinople’s geographic position made it a primary, central hub of global trade and interdependence, Byzantine merchants and diplomats maintained strong trade relations with groups such as the Islamic Caliphates, Slavic territories and Western European countries. This happened primarily though major trade routes such as the silk road which connected the empire to China and Central Asia, bringing luxury goods like silk and spices westward. Another trade route used by the Byzantine empire was the route from the Varangians to the Greeks, which followed Russian rivers down to the Black sea, connecting Scandinavia and Kievan Rus to Constantinople. Also, the Mediterranean and Black Sea Networks acted as another primary trade network, as it moved staple goods like grain, wine, and olive oil across the Mediterranean and Black seas.`
    },
    {
      heading: 'Cultural Characteristics',
      body: `The Byzantine Empire had a cultural influence through its art and architecture that had a very distinct style and design. It blended and connected traditions from Roman, Christian, and Greek traditions. Art from the Byzantines are known for its religious mosaics, frescoes, and religious icons that are found in churches, palaces, and other public spaces across the empire. As said before, the Hagia Sophia is one of the Byzantine Empire’s most notable creations in architecture, and left a legacy that continued to inspire other architects. The Byzantine empire was also able to spread their culture through trading, which was the cause of most of their success and expansion. They traveled long distances through sailing and the Roman road system and commanded trading routes. They traded olive oil, wheat, honey, wine, and fish sauce, and they put taxes and tolls on the goods. The tax could be paid with luxury materials.`
    }
  ];

  /* Sections 1–2 appear ABOVE the first image.
     Sections 3–6 appear BETWEEN the first image and image gallery.
     Sections 7–10 appear AFTER the image gallery.
     Change the numbers below if you want to rearrange them. */
  function format(items) {
    return items.map(function (item) {
      return item.heading + '\n\n' + item.body;
    }).join('\n\n');
  }

  window.BYZANTINE_ABOUT_US_CONTENT = {
    title: 'About Us',
    overline: 'Page 2',
    year: '330 CE - 1453 CE',
    tagline: 'THE BYZANTINE EMPIRE',
    description: format(sections.slice(0, 2)),
    roleTitles: [],
    roleDescription: format(sections.slice(2, 6)),
    stack: [],
    challenges: format(sections.slice(6))
  };
})();
