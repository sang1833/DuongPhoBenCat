import { StreetInfo } from "../types";

export const streets: StreetInfo[] = [
  {
    id: "1",
    name: "Main Street",
    address: "123 Main St, Thới Hoà, State 12345",
    description:
      "The central street of Cityville, known for its historic buildings and vibrant community.",
    route: [
      [11.1616595, 106.594514],
      [11.1617595, 106.594614],
      [11.1618595, 106.594714]
    ],
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
      "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb"
    ],
    history: [
      {
        period: "1800 - 1850",
        description:
          "<p>Originally a <strong>dirt road</strong> connecting farmlands. It was the main thoroughfare for horse-drawn carriages and early settlers.</p>"
      },
      {
        period: "1851 - 1920",
        description:
          "<p>Developed into a <em>bustling commercial center</em>. Key developments include:</p><ul><li>First brick buildings erected</li><li>Introduction of the trolley system</li><li>Establishment of the town hall</li></ul>"
      },
      {
        period: "1921 - Present",
        description:
          "<p>Modernized with preservation of historic facades. Notable changes:</p><ol><li>Widening of the street in 1950s</li><li>Pedestrian-friendly renovations in 1990s</li><li>Addition of bike lanes in 2010</li></ol>"
      }
    ]
  },
  {
    id: "2",
    name: "Oak Avenue",
    address: "456 Oak Ave, HomeTown, State 67890",
    description:
      "A charming residential street lined with mature oak trees and family homes.",
    route: [
      [11.1619595, 106.594814],
      [11.1620595, 106.594914],
      [11.1621595, 106.595014]
    ],
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
    ],
    history: [
      {
        period: "1900 - 1950",
        description:
          "<p>Developed as a <strong>suburban expansion</strong> of HomeTown. Features include:</p><ul><li>Large plots for single-family homes</li><li>Planting of oak saplings along the avenue</li></ul>"
      },
      {
        period: "1951 - Present",
        description:
          '<p>Known for its <em>annual block parties</em> and community spirit. Recent developments:</p><ol><li>Establishment of the Oak Avenue Neighborhood Association in 1975</li><li>Installation of historic street lamps in 2000</li><li>Recognition as a "Tree City USA" neighborhood in 2015</li></ol>'
      }
    ]
  },
  {
    id: "3",
    name: "Maple Boulevard",
    address: "789 Maple Blvd, SpringField, State 13579",
    description:
      "A wide boulevard featuring a mix of residential and commercial properties.",
    route: [
      [11.1622595, 106.595114],
      [11.1623595, 106.595214],
      [11.1624595, 106.595314]
    ],
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      "https://images.unsplash.com/photo-1565953554309-d181306db7d5"
    ],
    history: [
      {
        period: "1920 - 1970",
        description:
          "<p>Originally planned as a <strong>grand entrance</strong> to SpringField. Key features:</p><ul><li>Wide, tree-lined median</li><li>Elegant mansions and upscale shops</li><li>Streetcar line running down the center</li></ul>"
      },
      {
        period: "1971 - Present",
        description:
          "<p>Revitalized with <em>modern amenities</em> while preserving its historic charm. Recent changes include:</p><ol><li>Conversion of streetcar line to a green pedestrian walkway in 1980</li><li>Restoration of historic building facades in 2000</li><li>Addition of dedicated bike lanes and smart traffic systems in 2018</li></ol>"
      }
    ]
  },
  {
    id: "4",
    name: "River Road",
    address: "101 River Rd, Cityville, State 12345",
    description:
      "A scenic route along the riverfront, popular for jogging and cycling.",
    route: [
      [11.1625595, 106.595414],
      [11.1626595, 106.595514],
      [11.1627595, 106.595614]
    ],
    images: [
      "https://images.unsplash.com/photo-1506854309843-995c2c241f8d",
      "https://images.unsplash.com/photo-1580777187326-d45ec82084d3"
    ],
    history: [
      {
        period: "1890 - 1950",
        description:
          "<p>Originally a <strong>working waterfront</strong> with warehouses and docks. Key features:</p><ul><li>Busy port for cargo ships</li><li>Fish markets and boat repair shops</li></ul>"
      },
      {
        period: "1951 - Present",
        description:
          "<p>Transformed into a <em>recreational paradise</em>. Notable developments:</p><ol><li>Creation of a riverside park in 1970</li><li>Installation of a dedicated bike path in 1990</li><li>Opening of waterfront cafes and boutiques in 2005</li></ol>"
      }
    ]
  },
  {
    id: "5",
    name: "Market Street",
    address: "222 Market St, HomeTown, State 67890",
    description:
      "The bustling commercial heart of HomeTown, filled with shops and restaurants.",
    route: [
      [11.1628595, 106.595714],
      [11.1629595, 106.595814],
      [11.1630595, 106.595914]
    ],
    images: [
      "https://images.unsplash.com/photo-1555529771-7888783a18d3",
      "https://images.unsplash.com/photo-1573108724029-4c46571d6490"
    ],
    history: [
      {
        period: "1850 - 1920",
        description:
          "<p>Established as the <strong>main trading hub</strong> of HomeTown. Notable features:</p><ul><li>Open-air market stalls</li><li>Horse-drawn delivery wagons</li><li>First general store opened in 1875</li></ul>"
      },
      {
        period: "1921 - Present",
        description:
          "<p>Evolved into a <em>modern shopping district</em>. Key developments:</p><ol><li>Introduction of the first department store in 1930</li><li>Pedestrianization of the street in 1985</li><li>Annual food and craft festival started in 2000</li></ol>"
      }
    ]
  },
  {
    id: "6",
    name: "College Avenue",
    address: "333 College Ave, SpringField, State 13579",
    description:
      "A lively street adjacent to the local university, filled with bookstores, cafes, and student housing.",
    route: [
      [11.1631595, 106.596014],
      [11.1632595, 106.596114],
      [11.1633595, 106.596214]
    ],
    images: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
      "https://images.unsplash.com/photo-1562774053-701939374585"
    ],
    history: [
      {
        period: "1900 - 1960",
        description:
          "<p>Developed alongside the growth of <strong>SpringField University</strong>. Key features:</p><ul><li>First dormitories built in 1910</li><li>Opening of the university library in 1925</li><li>Establishment of the first off-campus bookstore in 1940</li></ul>"
      },
      {
        period: "1961 - Present",
        description:
          '<p>Transformed into a <em>vibrant college town atmosphere</em>. Notable changes:</p><ol><li>Student-led beautification project in 1970</li><li>Introduction of the annual "College Ave Arts Festival" in 1985</li><li>Implementation of free Wi-Fi along the entire street in 2010</li></ol>'
      }
    ]
  }
];
