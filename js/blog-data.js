/**
 * AURA & VELLUM ATELIER — MASTER BLOG DATA REGISTRY
 * Maps every blog card to its exact title, exact image, metadata, and full editorial content.
 */

const BLOG_POSTS = {
  // 1. Art of Wax Seals & Deckle Edges (Main Archive 1 & Index Card 1)
  "art-wax-seals": {
    id: "art-wax-seals",
    title: "The Art of Wax Seals & Deckle Edges",
    category: "Artisan Craft",
    categoryKey: "artisan-craft",
    eyebrow: "Studio Secrets • By Genevieve",
    author: {
      name: "Genevieve Beauchamp",
      role: "Creative Director & Master Typographer",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80",
      bio: "Founder of Aura & Vellum with over 15 years reviving historical platen printmaking, handmade deckle papers, and custom monogram die engraving."
    },
    date: "Sep 18, 2026",
    readTime: "5 min read",
    image: "images/blog-wax-seals.jpg",
    imageAlt: "Artisanal sealing wax stick, melting spoon, and stamped wax seals on deckle paper",
    lead: "Why hand-poured molten wax and feathery water-torn deckle paper evoke unforgettable nostalgic romance for wedding guests long before they read the words on the card.",
    sections: [
      {
        heading: "The Sensory Ceremony of Opening an Invitation",
        paragraphs: [
          "When your wedding guest receives their invitation in the mail, their fingers experience a tactile narrative before their eyes take in a single letter. In an era dominated by transient digital notifications, the deliberate ceremony of cracking a sculpted monogram wax seal provides a rare, visceral moment of pause.",
          "For centuries across European courts, the breaking of a wax seal signified intimate confidence and paramount occasion. Modern luxury stationery elevates this tradition by pairing bespoke heraldic stamps with pillowy, hand-torn cotton deckle papers."
        ]
      },
      {
        heading: "The Chemistry of Flexible Sealing Wax",
        paragraphs: [
          "Traditional antique sealing waxes were formulated from brittle shellac and rosin—designed to shatter irreversibly if a letter was intercepted in transit. However, modern automated postal machinery would instantly crush brittle wax.",
          "At Aura & Vellum, we formulate our studio waxes using flexible natural beeswax, pine resin, and mineral mica flakes. This allows each seal to bend slightly under high postal roller pressure without cracking, arriving at your guest's door in immaculate three-dimensional relief."
        ]
      },
      {
        quote: "“A deckle edge is not an imperfection; it is paper celebrating its organic birth from water and pure cotton fiber.”"
      },
      {
        heading: "Feathery Deckle Edges: Mould vs. Water-Torn",
        paragraphs: [
          "A genuine mould-made deckle edge forms naturally when liquefied cotton pulp settles against the wooden deckle frame, thinning outward into an organic feather. In our SoHo atelier, we also craft water-torn deckles using pointed calligraphy water brushes and brass tearing rulers to create delicate, bespoke edges across duplexed 600gsm boards.",
          "To complete the look, pair your deckle edges with naturally dyed raw silk floss ribbons and hand-poured molten wax in tones of Warm Champagne, Florentine Burgundy, or Olive Branch."
        ],
        takeaways: [
          "Always request 'Hand-Canceling' at your local postal branch to protect raised wax seals.",
          "Opt for flexible beeswax formulations over rigid craft store waxes.",
          "Combine feathery deckle paper with contrasting translucent vellum wraps for multi-layered depth."
        ]
      }
    ],
    relatedIds: ["mail-save-the-dates", "paper-weights-decoded", "metallic-inks-gold", "italian-villa-wedding"]
  },

  // 2. When to Mail Save the Dates & Invites (Main Archive 2 & Index Card 2)
  "mail-save-the-dates": {
    id: "mail-save-the-dates",
    title: "When to Mail Save the Dates & Invites",
    category: "Wedding Etiquette",
    categoryKey: "etiquette",
    eyebrow: "Wedding Protocol • By Alistair",
    author: {
      name: "Alistair Sterling",
      role: "Senior Stationery Concierge & Etiquette Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      bio: "Specialist in high-society wedding protocols, formal honorific addressing, and multi-timeline bridal stationery planning."
    },
    date: "Sep 04, 2026",
    readTime: "7 min read",
    image: "images/blog-save-dates.jpg",
    imageAlt: "Hand addressed calligraphy envelopes and vintage postage stamp collection",
    lead: "Navigate the exact timeline for domestic vs destination celebrations to ensure prompt RSVPs, proper honorific envelope addressing, and seamless print production.",
    sections: [
      {
        heading: "The Golden Rule of Bridal Timeline Planning",
        paragraphs: [
          "One of the most frequent dilemmas couples face is determining when to dispatch their stationery suites. Mailing too early risks guests misplacing details, while mailing too late leads to stressful catering deadlines and rushed guest travel arrangements.",
          "Because bespoke letterpress, hot foil die machining, and calligraphy addressing require 4 to 8 weeks of atelier craftsmanship, your production timeline must be synchronized with your mailing targets."
        ]
      },
      {
        heading: "Domestic vs. Destination Wedding Timelines",
        paragraphs: [
          "For **Destination Celebrations (Europe, Tropical Islands, Remote Estates)**: Save the Dates must be mailed **8 to 10 months prior** to the celebration. Formal invitation suites should follow at **10 to 12 weeks prior**, with an RSVP deadline locked at 6 weeks.",
          "For **Domestic Celebrations (Local Venues & Metropolitan Cathedrals)**: Save the Dates are ideally dispatched **6 to 8 months ahead**. Formal invitation suites should be mailed **6 to 8 weeks ahead**, setting the RSVP cutoff 4 weeks before the wedding date."
        ]
      },
      {
        quote: "“Precision in your mailing timeline gives your guests the gift of anticipation and spares you the anxiety of last-minute RSVP follow-ups.”"
      },
      {
        heading: "Outer & Inner Envelope Addressing Protocols",
        paragraphs: [
          "Formal etiquette calls for two envelopes: the protective outer envelope carrying the postal address and formal title, and the unsealed inner envelope indicating exactly who is invited (including plus-ones and children).",
          "Never abbreviate street names, cities, or state designations on formal outer envelopes. Spell out 'Boulevard', 'Avenue', 'Apartment', and 'California' to honor classical diplomatic addressing standards."
        ],
        takeaways: [
          "Order sample postal weighing with a complete suite before purchasing vintage stamps.",
          "Allow 3 weeks for hand calligraphy envelope addressing before your target mail date.",
          "Include a stamped, pre-addressed RSVP reply envelope with meal options clearly marked."
        ]
      }
    ],
    relatedIds: ["art-wax-seals", "rsvp-mistakes", "formal-wording-honorifics", "paper-weights-decoded"]
  },

  // 3. Paper Weights Decoded: 600gsm Cotton (Main Archive 3 & Index Card 3)
  "paper-weights-decoded": {
    id: "paper-weights-decoded",
    title: "Paper Weights Decoded: 600gsm Cotton",
    category: "Paper Science",
    categoryKey: "paper-guide",
    eyebrow: "Materials • By Mateo Rossi",
    author: {
      name: "Mateo Rossi",
      role: "Master Platen Pressman & Paper Technologist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      bio: "Third-generation Florence-trained letterpress artisan specializing in platen pressure calibration and hand-cast cotton board duplexing."
    },
    date: "Aug 26, 2026",
    readTime: "4 min read",
    image: "images/blog-paper-weights.jpg",
    imageAlt: "Artisan paper swatches and heavy tactile cotton paper weights comparison 300gsm, 600gsm, 900gsm",
    lead: "Explore why ultra-thick duplexed cotton board produces deep letterpress debossing without warping, show-through, or bending in postal transit.",
    sections: [
      {
        heading: "Understanding GSM: Grams Per Square Meter",
        paragraphs: [
          "In fine paper science, 'GSM' measures paper density and weight. Standard commercial stationery operates between 120gsm and 240gsm. However, haute couture wedding printmaking requires heavy, porous cotton boards capable of absorbing tons of platen pressure.",
          "When a heated brass die strikes 100% cotton fibers, it compresses the cellulose without breaking it, creating permanent sculptural shadows and tactile debossed valleys."
        ]
      },
      {
        heading: "The Three Core Atelier Paper Calipers",
        paragraphs: [
          "**300 GSM (Single-Ply Cotton)**: Lightweight and supple. Ideal for RSVP reply cards, weekend itinerary inserts, and envelope liners where minimal thickness is required.",
          "**600 GSM (Double-Ply Duplexed Cotton)**: The gold standard for wedding invitation cards. Rigid enough to stand upright on an easel, thick enough for deep deboss without show-through on the reverse side.",
          "**900 GSM (Triple-Ply Beveled Board)**: An ultra-heavy monument of papercraft. Features hand-painted beveled gilded edges and dramatic architectural depth."
        ]
      },
      {
        quote: "“100% cotton paper has memory. It holds the pressure of the press and the warmth of the ink for centuries without yellowing or crumbling.”"
      },
      {
        heading: "Tree-Free Sustainability of Cotton Rag",
        paragraphs: [
          "Unlike wood pulp papers that require cutting down timber, cotton paper is crafted from textile cotton linters—a reclaimed byproduct of cotton farming that would otherwise be discarded. It is naturally acid-free, chlorine-free, and archival.",
          "When you hold a 600gsm cotton invitation, you immediately feel the softness of fabric combined with the structural majesty of an ancient architectural document."
        ],
        takeaways: [
          "Choose 600gsm for the main invitation card to achieve dramatic letterpress indentations.",
          "Use 300gsm for enclosure cards to keep postal envelope weight under 2 ounces.",
          "Consider hand-painted gilded edges to accentuate the thickness of duplexed boards."
        ]
      }
    ],
    relatedIds: ["platen-press-vs-digital", "art-wax-seals", "heidelberg-legacy", "italian-villa-wedding"]
  },

  // 4. An Italian Villa Wedding: Bronze Foil (Main Archive 4)
  "italian-villa-wedding": {
    id: "italian-villa-wedding",
    title: "An Italian Villa Wedding: Bronze Foil",
    category: "Real Weddings",
    categoryKey: "real-weddings",
    eyebrow: "Real Wedding • Villa Balbiano",
    author: {
      name: "Genevieve Beauchamp",
      role: "Creative Director & Master Typographer",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80",
      bio: "Founder of Aura & Vellum with over 15 years reviving historical platen printmaking, handmade deckle papers, and custom monogram die engraving."
    },
    date: "Aug 12, 2026",
    readTime: "6 min read",
    image: "images/blog-italian-villa.jpg",
    imageAlt: "Lake Como wedding invitation suite on handmade cotton with wax seal and villa backdrop",
    lead: "A peek into Elena & Julian's Lake Como suite featuring hand-painted botanical maps, translucent vellum wraps, and burnished bronze foil finishes.",
    sections: [
      {
        heading: "Capturing the Romance of Lake Como",
        paragraphs: [
          "When Elena and Julian approached our atelier to design their Lake Como nuptials at Villa Balbiano, they wanted stationery that echoed the neoclassical stone balustrades, cypress trees, and shimmering waters of northern Italy.",
          "We curated a palette of warm Amalfi cream, olive branch botanical inks, and custom burnished antique bronze foil that glints like afternoon sunlight across the lake."
        ]
      },
      {
        heading: "The Hand-Painted Watercolor Cartography",
        paragraphs: [
          "The centerpiece of the weekend enclosure was an archival watercolor map illustrating private boat ferries from Bellagio to Tremezzo, historic villas along the shoreline, and the couple's welcome dinner trattoria.",
          "Each map was printed on 300gsm deckle-edge Italian cotton paper, then wrapped in a frosted vellum sleeve tied with hand-dyed olive green silk floss and stamped with a custom cypress tree wax seal."
        ]
      },
      {
        quote: "“The guests remarked that holding the invitation felt like stepping into an Italian fairytale before packing their bags.”"
      },
      {
        heading: "Day-Of Paperie Harmonization",
        paragraphs: [
          "For the lakeside banquet, we extended the bronze foil motif into personalized deckle-edge dinner menus, individual calligraphy place cards tucked into fresh olive sprigs, and a gilded mirror seating chart with wax seal table allocations.",
          "Every element reflected the timeless beauty of the Italian landscape, uniting the visual narrative from the first Save the Date to the final farewell brunch."
        ],
        takeaways: [
          "Incorporate custom destination maps to guide out-of-town guests through multiple venues.",
          "Use antique bronze foil to achieve warm metallic radiance without modern yellow glare.",
          "Carry the stationery motif through reception menus, place cards, and cocktail signage."
        ]
      }
    ],
    relatedIds: ["french-chateau-romance", "trend-forecast-2027", "art-wax-seals", "metallic-inks-gold"]
  },

  // 5. Chemistry of Metallic Inks & Dip Nibs (Main Archive 5)
  "metallic-inks-gold": {
    id: "metallic-inks-gold",
    title: "Chemistry of Metallic Inks & Dip Nibs",
    category: "Artisan Craft",
    categoryKey: "artisan-craft",
    eyebrow: "Artisan Guide • By Seraphina",
    author: {
      name: "Seraphina Lin",
      role: "Lead Master Calligrapher & Ink Alchemist",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      bio: "Master of Copperplate, Spencerian, and Modern Organic scripts with expertise in custom gold mica and sumi ink pigment formulation."
    },
    date: "Jul 29, 2026",
    readTime: "5 min read",
    image: "images/blog-calligraphy-nibs.jpg",
    imageAlt: "Master calligrapher dipping gold pointed nib into rich metallic gold ink",
    lead: "How archival mica pigments and gum arabic combine to create waterproof, shimmering script on dark velvet envelopes without clogging flexible pointed dip nibs.",
    sections: [
      {
        heading: "The Lost Chemistry of Gold Script",
        paragraphs: [
          "Commercial calligraphy inks often separate, smudge, or lack opacity when written on dark cotton envelopes. Achieving a rich, raised gold hairline requires understanding surface tension, pigment particle suspension, and nib flexibility.",
          "In our studio, we grind natural mineral mica flakes into a base of distilled water and pure acacia gum arabic. The gum acts as both a binder and a suspension agent, holding shimmering gold particles in even distribution."
        ]
      },
      {
        heading: "Selecting the Perfect Pointed Dip Nib",
        paragraphs: [
          "Not all calligraphy nibs handle metallic pigment equally. Flexible pointed nibs like the Leonardt Principal EF and Brause Steno 361 provide dramatic line variation—from razor-sharp hairlines to sweeping, ink-heavy downstrokes.",
          "The calligrapher must constantly stir the ink jar while writing to ensure metallic density remains uniform across every individual guest address."
        ]
      },
      {
        quote: "“Calligraphy is the heartbeat of human touch on paper—each flourish is a unique brushstroke of hospitality for your guest.”"
      },
      {
        heading: "Waterproof Fixation for Postal Safety",
        paragraphs: [
          "Because invitations must survive postal transit in rain or humidity, each addressed envelope is treated with micro-crystalline archival wax fixative. This seals the metallic gold lettering against water droplets while preserving its brilliant light reflectivity."
        ],
        takeaways: [
          "Use oblique pen holders for Copperplate calligraphy to maintain the classic 55-degree slant.",
          "Formulate metallic inks with gum arabic to prevent flaking and feathering on cotton paper.",
          "Protect addressed envelopes with micro-crystalline fixative before dispatch."
        ]
      }
    ],
    relatedIds: ["art-wax-seals", "mail-save-the-dates", "french-chateau-romance", "formal-wording-honorifics"]
  },

  // 6. Hot Foil vs. Metallic Ink Letterpress (Main Archive 6)
  "platen-press-vs-digital": {
    id: "platen-press-vs-digital",
    title: "Hot Foil vs. Metallic Ink Letterpress",
    category: "Paper Science",
    categoryKey: "paper-guide",
    eyebrow: "Printmaking • By Alistair",
    author: {
      name: "Mateo Rossi",
      role: "Master Platen Pressman & Paper Technologist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      bio: "Third-generation Florence-trained letterpress artisan specializing in platen pressure calibration and hand-cast cotton board duplexing."
    },
    date: "Jul 15, 2026",
    readTime: "4 min read",
    image: "images/blog-hot-foil.jpg",
    imageAlt: "Heated brass die pressing gold foil into textured cardstock on Heidelberg press",
    lead: "Understanding the mechanical differences between mirror-reflective heated foil and soft matte pigment debossing on heavy 600gsm cotton rag boards.",
    sections: [
      {
        heading: "Heated Foil Stamping: Mirror Reflection",
        paragraphs: [
          "Hot foil stamping involves heating a CNC-machined brass or magnesium die to approximately 130°C (266°F). The heated die presses an ultra-thin polyester carrier ribbon carrying metallic leaf into the cotton paper, melting the adhesive backing and fusing the foil permanently to the fibers.",
          "The result is a brilliant, mirror-like specular reflection that bounces light across the room—ideal for crests, monograms, and bride & groom names."
        ]
      },
      {
        heading: "Letterpress Metallic Inks: Soft Matte Relief",
        paragraphs: [
          "Letterpress printing with metallic inks uses traditional oil-based pigments rolled across a cold photopolymer or magnesium plate. Instead of a mirror shine, metallic letterpress produces a subtle, velvety shimmer with deep tactile shadow.",
          "Because the ink penetrates the porous cotton fibers, it feels more integrated into the paper structure, making it ideal for large blocks of body copy, ceremony times, and venue details."
        ]
      },
      {
        quote: "“Hot foil reflects the light above it; letterpress creates its own shadow beneath it.”"
      },
      {
        heading: "The Hybrid Suite: Combining Both Methods",
        paragraphs: [
          "The most luxurious wedding suites combine both techniques in a single card: hot champagne gold foil for the couple's monogram crest and names, paired with crisp matte charcoal letterpress for the ceremony text and RSVP details."
        ],
        takeaways: [
          "Use hot foil stamping for headline names, monograms, and geometric borders.",
          "Use letterpress metallic ink for legible ceremony body text and RSVP details.",
          "Combine both on 600gsm duplexed cotton for maximum visual hierarchy and tactile depth."
        ]
      }
    ],
    relatedIds: ["heidelberg-legacy", "paper-weights-decoded", "art-wax-seals", "french-chateau-romance"]
  },

  // 7. Formal Wording for Modern Weddings (Main Archive 7)
  "formal-wording-honorifics": {
    id: "formal-wording-honorifics",
    title: "Formal Wording for Modern Weddings",
    category: "Wedding Etiquette",
    categoryKey: "etiquette",
    eyebrow: "Etiquette • By Genevieve",
    author: {
      name: "Alistair Sterling",
      role: "Senior Stationery Concierge & Etiquette Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      bio: "Specialist in high-society wedding protocols, formal honorific addressing, and multi-timeline bridal stationery planning."
    },
    date: "Jun 30, 2026",
    readTime: "6 min read",
    image: "images/blog-formal-wording.jpg",
    imageAlt: "Formal luxury wedding invitation card with elegant serif typography and botanical envelope",
    lead: "Gracefully navigating blended families, divorced parents, honorific titles, dress codes, and adult-only celebrations in classical invitation phrasing.",
    sections: [
      {
        heading: "The Nuances of Who Is Hosting",
        paragraphs: [
          "Wedding invitation wording is fundamentally a declaration of hospitality. Traditionally, the parents of the bride were listed on the top line as the sole hosts. Today, modern celebrations feature diverse hosting dynamics—from couples contributing jointly with both families to honoring deceased parents and stepparents.",
          "Understanding the precise placement of names ensures everyone feels honored without cluttering the typography."
        ]
      },
      {
        heading: "Essential Wording Formulas Decoded",
        paragraphs: [
          "**Bride's Parents Hosting**: *Mr. and Mrs. Charles Montgomery Vance request the honour of your presence at the marriage of their daughter Elena Sophia...*",
          "**Both Families Jointly Hosting**: *Together with their parents, Elena Sophia Vance and Alistair Harrison Sterling request the pleasure of your company...*",
          "**Divorced Parents**: *Mrs. Jacqueline Montgomery Vance and Mr. Charles Montgomery Vance request the honour of your presence...* (Mother's name appears first on her own line)."
        ]
      },
      {
        quote: "“Etiquette is not about rigid rules—it is the art of making every guest feel welcomed, respected, and clear on the celebration ahead.”"
      },
      {
        heading: "Dress Code & Enclosure Etiquette",
        paragraphs: [
          "Dress codes should be indicated in the lower right corner of the reception card or main invitation. Common standards include **Black Tie** (tuxedos and floor-length gowns), **Black Tie Optional** (dark suits permitted), or **Cocktail Attire**.",
          "Never print registry details or cash request poems on formal invitations; place registry links subtly on your wedding website enclosure card."
        ],
        takeaways: [
          "Spell out numbers, times, and years: 'Saturday, the nineteenth of September, two thousand and twenty-six'.",
          "Reserve 'honour of your presence' for religious houses of worship.",
          "Keep dress codes in the lower corner of the reception card."
        ]
      }
    ],
    relatedIds: ["rsvp-mistakes", "mail-save-the-dates", "art-wax-seals", "italian-villa-wedding"]
  },

  // 8. French Château Romance: Noir & Gold (Main Archive 8)
  "french-chateau-romance": {
    id: "french-chateau-romance",
    title: "French Château Romance: Noir & Gold",
    category: "Real Weddings",
    categoryKey: "real-weddings",
    eyebrow: "Real Wedding • Château de Villette",
    author: {
      name: "Genevieve Beauchamp",
      role: "Creative Director & Master Typographer",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80",
      bio: "Founder of Aura & Vellum with over 15 years reviving historical platen printmaking, handmade deckle papers, and custom monogram die engraving."
    },
    date: "Jun 14, 2026",
    readTime: "5 min read",
    image: "images/blog-french-chateau.jpg",
    imageAlt: "Romantic French chateau wedding reception with gold calligraphy place cards",
    lead: "How Camille & Henri paired dramatic obsidian noir letterpress board with molten champagne gold foil and hand-torn beveled edges for their Parisian soirée.",
    sections: [
      {
        heading: "The Drama of High-Contrast Monochrome",
        paragraphs: [
          "Set against the baroque grandeur of Château de Villette in the French countryside, Camille and Henri desired a stationery suite that balanced Parisian historic romance with contemporary architectural minimalism.",
          "We engineered custom duplexed 700gsm Obsidian Noir cotton board—deep midnight black—stamped with reflective 22k champagne gold foil typography."
        ]
      },
      {
        heading: "Gilded Edge Beveling & Wax Intaglio",
        paragraphs: [
          "Each card underwent a multi-step artisanal finishing process. The edges of the thick black board were hand-beveled at a 45-degree angle and gilded with molten gold foil leaf, creating a radiant golden border when stacked together.",
          "The envelopes were secured with custom black beeswax seals stamped in gold intaglio, revealing the couple's intertwined French script monogram."
        ]
      },
      {
        quote: "“Black and gold when executed with letterpress and cotton paper transcends trendiness; it becomes an enduring masterpiece of royal elegance.”"
      },
      {
        heading: "Candlelit Reception Place Settings",
        paragraphs: [
          "At the candlelit banquet inside the château's glass orangerie, guests found individual black cotton menus letterpressed in gold foil, accompanied by calligraphed alabaster stone place tiles.",
          "The cohesive design language tied together centuries-old stone architecture with modern bespoke luxury."
        ],
        takeaways: [
          "Dark paper stocks require heavy hot foil stamping or opaque silkscreen inks for crisp legibility.",
          "Beveled gilded edges add an unmistakable luxury heirloom weight to thick cotton suites.",
          "Use contrasting wax seal colors to create high visual impact on envelope flaps."
        ]
      }
    ],
    relatedIds: ["italian-villa-wedding", "trend-forecast-2027", "platen-press-vs-digital", "metallic-inks-gold"]
  },

  // 9. 2027 Bridal Stationery Forecast (Spotlight Hero)
  "trend-forecast-2027": {
    id: "trend-forecast-2027",
    title: "The 2027 Bridal Stationery Forecast: Gilded Botanical Parchment & Heirloom Wax Seals",
    category: "Trend Report",
    categoryKey: "artisan-craft",
    eyebrow: "2027 Trend Forecast • Cover Story",
    author: {
      name: "Genevieve Beauchamp",
      role: "Creative Director & Master Typographer",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80",
      bio: "Founder of Aura & Vellum with over 15 years reviving historical platen printmaking, handmade deckle papers, and custom monogram die engraving."
    },
    date: "Sep 24, 2026",
    readTime: "8 min read",
    image: "images/blog-trend-forecast.jpg",
    imageAlt: "Handcrafted luxury wedding stationery suite with gold foil calligraphy, lavender botanicals, and wax seal",
    lead: "From hand-pressed wild lavender petals embedded in translucent vellum to sculptured triple-thick letterpress, discover what high-society weddings are choosing for next season.",
    sections: [
      {
        heading: "The Resurgence of Tactile Maximalism",
        paragraphs: [
          "As wedding celebrations become more curated and intimate, the role of stationery has shifted from a mere informational dispatch to an experiential heirloom. Couples are moving away from flat, single-card digital invitations in favor of multi-layered, tactile presentation boxes.",
          "Next season's foremost aesthetic movement is Botanical Vellum Fusion: real botanical specimens—dried lavender sprigs, pressed olive leaves, and delicate fern fronds—sandwiched between frosted translucent vellum jackets and heavy deckle cotton boards."
        ]
      },
      {
        heading: "Architectural Debossing & Sculpted Dies",
        paragraphs: [
          "Blind debossing—pressing custom brass dies into paper without any ink—is taking center stage. Couples are commissioning custom architectural illustrations of their historic venues, châteaux, or cathedrals, debossed deeply into 900gsm pillowy cotton.",
          "The deboss catches natural raking light, producing soft sculptural shadows that invite guests to run their fingers across the paper."
        ]
      },
      {
        quote: "“The 2027 bride wants stationery that feels like it was discovered in an ancient library, yet printed with unmatched modern precision.”"
      },
      {
        heading: "Warm Earth Metallics: Rose Gold & Antique Bronze",
        paragraphs: [
          "While cool silvers and bright yellows dominated past years, 2027 embraces warm, burnished earth metallics: Warm Champagne, Antique Copper, and Tuscan Bronze. These tones harmonize effortlessly with organic linen wraps, deckle edges, and hand-dyed silk ribbons."
        ],
        takeaways: [
          "Layer translucent frosted vellum over letterpress suites to create visual intrigue.",
          "Embrace blind debossing for venue illustrations and heraldic crests.",
          "Select warm bronze and champagne foil tones for timeless elegance."
        ]
      }
    ],
    relatedIds: ["art-wax-seals", "italian-villa-wedding", "french-chateau-romance", "paper-weights-decoded"]
  },

  // 10. 7 Mistakes to Avoid When Requesting RSVPs (Spotlight Mini 1)
  "rsvp-mistakes": {
    id: "rsvp-mistakes",
    title: "7 Mistakes to Avoid When Requesting RSVPs",
    category: "Etiquette Digest",
    categoryKey: "etiquette",
    eyebrow: "Etiquette Digest • By Alistair",
    author: {
      name: "Alistair Sterling",
      role: "Senior Stationery Concierge & Etiquette Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      bio: "Specialist in high-society wedding protocols, formal honorific addressing, and multi-timeline bridal stationery planning."
    },
    date: "Sep 10, 2026",
    readTime: "4 min read",
    image: "images/blog-rsvp-mistakes.jpg",
    imageAlt: "Hand addressed wedding RSVP reply cards, reply envelopes with gold postage stamps and calligraphy pen",
    lead: "How to politely manage dietary cards, plus-one allocations, and digital response deadlines without awkward guest follow-ups.",
    sections: [
      {
        heading: "The Anatomy of a Flawless RSVP Card",
        paragraphs: [
          "The RSVP card is the most functional piece of your wedding suite. However, small oversights in wording or deadline calculation can lead to confusion, late replies, and stressful catering headcount estimates.",
          "By implementing clear etiquette phrasing and pre-formatted options, you make responding effortless for your guests while securing accurate counts."
        ]
      },
      {
        heading: "The 7 Most Common RSVP Pitfalls",
        paragraphs: [
          "1. **Setting the Deadline Too Close to the Wedding**: Always set the RSVP date 4 to 5 weeks before the wedding to give your caterer and stationer ample time for place card production.",
          "2. **Ambiguous Plus-One Allocations**: Use the phrase 'We have reserved ___ seats in your honor' to prevent unexpected extra guests.",
          "3. **Forgetting Return Postage**: Always affix valid postage stamps to physical reply envelopes.",
          "4. **Vague Meal Choices**: List exact entrée choices (e.g. 'Filet of Beef', 'Pan-Seared Sea Bass', 'Wild Mushroom Risotto') with dietary allergy check-boxes.",
          "5. **Unnumbered Cards**: Number the back of each RSVP card with invisible UV ink or pencil corresponding to your master guest spreadsheet in case handwriting is illegible.",
          "6. **Overcomplicating Digital QR Codes**: If using a digital RSVP QR code, ensure it links directly to your form without requiring app downloads.",
          "7. **Neglecting Buffer Headcounts**: Always budget for a 5% last-minute guest fluctuation."
        ]
      },
      {
        quote: "“Clarity on your RSVP card is an act of consideration for your guests and peace of mind for your wedding week.”"
      }
    ],
    takeaways: [
      "Number the back of each physical RSVP card lightly in pencil to identify unsigned cards.",
      "Specify exact deadline dates: 'Kindly reply by August 15, 2026'.",
      "Include clear dietary check-boxes for caterer compliance."
    ],
    relatedIds: ["mail-save-the-dates", "formal-wording-honorifics", "art-wax-seals", "trend-forecast-2027"]
  },

  // 11. The 120-Year Legacy of our 1904 Heidelberg Press (Spotlight Mini 2)
  "heidelberg-legacy": {
    id: "heidelberg-legacy",
    title: "The 120-Year Legacy of our 1904 Heidelberg Press",
    category: "Artisan Heritage",
    categoryKey: "artisan-craft",
    eyebrow: "Artisan Heritage • By Mateo Rossi",
    author: {
      name: "Mateo Rossi",
      role: "Master Platen Pressman & Paper Technologist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      bio: "Third-generation Florence-trained letterpress artisan specializing in platen pressure calibration and hand-cast cotton board duplexing."
    },
    date: "Aug 30, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Vintage metal letterpress type blocks and artisanal typography in atelier",
    lead: "Why antique cast-iron platen presses produce unmatched deep tactile debossing that modern digital printers cannot mimic.",
    sections: [
      {
        heading: "Cast-Iron Precision Built to Last Centuries",
        paragraphs: [
          "In a world where technology is designed for planned obsolescence, our 1904 Heidelberg Windmill and platen presses remain mechanical wonders. Cast from solid German iron with precision counter-weights, these machines exert up to 20 tons of direct platen pressure.",
          "Unlike modern offset or digital rollers that merely lay ink flat on the surface, a platen press drives metal type directly into the cotton board, permanently reshaping the topography of the paper."
        ]
      },
      {
        heading: "The Rhythm of Hand-Fed Platen Inking",
        paragraphs: [
          "Every suite that leaves our pressroom is individually hand-registered by our master pressmen. Oil-based Pantone pigments are mixed by eye on glass slabs, adjusted with natural linseed oils, and rolled across ink discs.",
          "The distinctive mechanical heartbeat of the press has resonated in our studio for over two decades, crafting stationery that endures as family heirlooms."
        ]
      },
      {
        quote: "“Digital printing informs the mind; letterpress touches the soul through the fingertips.”"
      }
    ],
    takeaways: [
      "Letterpress debossing creates true physical relief that digital printing cannot reproduce.",
      "Each sheet receives custom inking calibration for crisp hairline sharpness.",
      "Preserving antique presses keeps historical human craftsmanship alive."
    ],
    relatedIds: ["platen-press-vs-digital", "paper-weights-decoded", "art-wax-seals", "trend-forecast-2027"]
  }
};

// Aliases for index.html compatibility
BLOG_POSTS["art-wax-seals-index"] = BLOG_POSTS["art-wax-seals"];
BLOG_POSTS["mail-save-the-dates-index"] = BLOG_POSTS["mail-save-the-dates"];
BLOG_POSTS["paper-weights-index"] = BLOG_POSTS["paper-weights-decoded"];

if (typeof window !== 'undefined') {
  window.BLOG_POSTS = BLOG_POSTS;
}
