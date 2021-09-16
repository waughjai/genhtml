const genhtml = require( `./genhtml` );
const output = require( `./output` );

const slugify = ( text ) => text.toLowerCase().replace( /[^a-zA-Z0-9]/g, `-` );

const data = Object.freeze([
    {
        title: `Professional Experience`,
        items: [
            {
                title: `Oral and Maxillofacial Surgery Private Practice`,
                date: { start: `Aug 2016`, end: `Present` },
                content: [
                    [ `div`, `Owner, Island Oral and Facial Surgery` ],
                    [ `div`, `32650 SR 20 E#E106; Oak Harbor, WA; 98277` ],
                    [ `div`, `Keyesoralsurgery.com` ]
                ]
            },
            {
                title: `Oral and Maxillofacial Surgery Residency`,
                date: { start: `June 2012`, end: `June 2016` },
                content: [
                    [ `div`, `University of Arizona College of Medicine/Banner University Medical Center` ],
                    [ `div`, `Phoenix, AZ` ],
                    [ `ul`, [[ `li`, `Managed a team of 5-7 oral and maxillofacial surgery residents in the consultation and surgical management of hospitalized patients from June 2016 to June 2016 as Chief Resident` ]]]
                ]
            },
            {
                title: `Internship in Oral and Maxillofacial Surgery`,
                date: { start: `July 2011`, end: `June 2012` },
                content: [
                    [ `div`, `University of Iowa Hospitals and Clinics` ],
                    [ `div`, `Iowa City, IA` ]
                ]
            }
        ]
    },
    {
        title: `Education`,
        items: [
            {
                title: `University of the Pacific Arthur A. Dugoni School of Dentistry`,
                date: { start: `July 2008`, end: `June 2011` },
                content: [
                    [ `div`, `San Francisco, CA` ],
                    [ `div`, `Class of 2011, Honors` ],
                    [ `div`, `Class rank: 17/140, GPA: 3.59` ],
                    [ `div`, `National Dental Boards Score: 95` ]
                ]
            },
            {
                title: `Brigham Young University`,
                date: { start: `September 2003`, end: `July 2007` },
                content: [
                    [ `div`, `Pravo, Utah` ],
                    [ `div`, `BS Neuroscience July, 2007` ],
                    [ `div`, `GPA: 3.66` ]
                ]
            }
        ]
    },
    {
        title: `Publications/Research/Grants`,
        items: [
            {
                title: `Cancer Research Fellow – BYU Cancer Research Center`,
                date: { start: `August 2005`, end: `May 2008` },
                content: [
                    [ `p`, `Recipient of the BYU Cancer Research Grant. Research resulted in the formation of a small pharmaceutical company that developed drugs against cancer metastasis.` ],
                    [ `p`, `Len Tolstunov, Bahram Javid, Lance Keyes, Anders Nattestad. <i>Pericoronal Ostectomy: An Alternative Surgical Technique for Management of Mandibular Third Molars in Close Proximity to the Inferior Alveolar Nerve.</i> Journal of Oral and Maxillofacial Surgery Vol. 69, Issue 7, Pages 1858-1866` ],
                    [ `p`, `Peter Langford, Lance Keyes, Marc Hansen. <i>Plasma Membrane Ion Fluxes and NFAT- dependent Gene Transcription Contribute to CMET Induced Epithelial Scattering.</i> Journal of Cell Science. ${ genhtml.generateDateHTML( `June 8, 2012` ) }` ]
                ]
            }
        ]
    },
    {
        title: `Special/Volunteer Experience`,
        items: [
            {
                title: `Dental mission trip to Cusco, Peru`,
                date: `March 2010`
            },
            {
                title: `Dental mission trip to Quevedo, Ecuador`,
                date: { start: `April 2005`, end: `May 2005` }
            },
            {
                title: `Volunteer in Sealants for Smiles program`,
                date: { start: `March 2007`, end: `June 2007` }
            },
            {
                title: `Elementary school children in Utah`,
                date: `March 2009`
            },
            {
                title: `LDS Missionary – The Church of Jesus Christ of Latter Day Saints`,
                date: { start: `February 2003`, end: `April 2005` },
                content: [
                    [ `div`, `Ecuador Guayaquil, North Mission` ],
                    [ `div`, `Fluent in Spanish` ]
                ]
            },
            {
                title: `Student Ambassador`,
                content: [
                    [ `div`, `Interviewed applicants for admission to the University of the Pacific School of Dentistry` ]
                ]
            },
            {
                title: `Peer Tutor: Anatomy, Biochemistry, Operative/Fixed Dentistry`
            }
        ]
    },
    {
        title: `Professional Presentations`,
        items: [
            {
                title: `BYU Cancer Research Center Fellow Presentation Day`,
                date: `August 2007`,
                content: [
                    [ `div`, `Presented results of Cancer Research Fellowship to a group of peers, professors, and donors` ]
                ]
            },
            {
                title: `Pacific Research Day`,
                date: `May 2009`,
                content: [
                    [ `div`, `Presented poster about membrane biophysics and its application to cancer drug delivery at Pacific Research Day` ]
                ]
            }
        ]
    }
]);

const generateEntry = ( entry ) => [
    `div`, { class: `vitae-i` },
    [
        [ `header`, { class: `vitae-i-header` }, [[ `h3`, { class: `vitae-i-nom` }, entry.title ], ( `date` in entry ) ? [ `div`, { class: `vitae-i-date` }, genhtml.generateDateHTML( entry.date ) ] : []] ],
        ( `content` in entry ) ? [ `div`, { class: `vitae-i-content` }, entry.content ] : []
    ]
];

const generateSection = ( sect ) => [
    [ `section`, { class: `vitae-sec`, id: slugify( sect.title ) }, [
        [ `h2`, { class: `vitae-nom` }, sect.title ],
        [ `div`, sect.items.map( generateEntry ) ]
    ]]
];

const generateNav = ( data ) => [
    `ul`,
    { class: `vitae-nav-l` },
    data.map(
        ( i ) => [ `li`, { class: `vitae-nav-i` }, [ `a`, { class: `vitae-nav-a`, href: `#${ slugify( i.title ) }` }, i.title ] ]
    )
];

output( [[ `nav`, { class: `vitae-nav` }, generateNav( data ) ], [ `div`, data.map( generateSection ) ]] );