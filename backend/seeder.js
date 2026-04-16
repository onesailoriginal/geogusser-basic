const { cityTable, sequelize } = require('./dbHandler');

const cities = [
    // Magyarország
    { name: 'Budapest', latitude: 47.4979, longitude: 19.0402, country: 'Magyarország' },
    { name: 'Debrecen', latitude: 47.5316, longitude: 21.6273, country: 'Magyarország' },
    { name: 'Szeged', latitude: 46.2530, longitude: 20.1414, country: 'Magyarország' },
    { name: 'Pécs', latitude: 46.0727, longitude: 18.2323, country: 'Magyarország' },
    { name: 'Győr', latitude: 47.6875, longitude: 17.6504, country: 'Magyarország' },
    { name: 'Miskolc', latitude: 48.1035, longitude: 20.7784, country: 'Magyarország' },
    { name: 'Nyíregyháza', latitude: 47.9495, longitude: 21.7244, country: 'Magyarország' },
    { name: 'Kecskemét', latitude: 46.9064, longitude: 19.6909, country: 'Magyarország' },
    { name: 'Székesfehérvár', latitude: 47.1860, longitude: 18.4221, country: 'Magyarország' },
    { name: 'Eger', latitude: 47.9025, longitude: 20.3772, country: 'Magyarország' },

    // Nyugat-Európa
    { name: 'London', latitude: 51.5074, longitude: -0.1278, country: 'Egyesült Királyság' },
    { name: 'Párizs', latitude: 48.8566, longitude: 2.3522, country: 'Franciaország' },
    { name: 'Berlin', latitude: 52.5200, longitude: 13.4050, country: 'Németország' },
    { name: 'Róma', latitude: 41.9028, longitude: 12.4964, country: 'Olaszország' },
    { name: 'Madrid', latitude: 40.4168, longitude: -3.7038, country: 'Spanyolország' },
    { name: 'Bécs', latitude: 48.2082, longitude: 16.3738, country: 'Ausztria' },
    { name: 'Brüsszel', latitude: 50.8503, longitude: 4.3517, country: 'Belgium' },
    { name: 'Amszterdam', latitude: 52.3676, longitude: 4.9041, country: 'Hollandia' },
    { name: 'Bern', latitude: 46.9481, longitude: 7.4474, country: 'Svájc' },
    { name: 'Lisszabon', latitude: 38.7169, longitude: -9.1399, country: 'Portugália' },
    { name: 'Dublin', latitude: 53.3498, longitude: -6.2603, country: 'Írország' },
    { name: 'Koppenhága', latitude: 55.6761, longitude: 12.5683, country: 'Dánia' },
    { name: 'Stockholm', latitude: 59.3293, longitude: 18.0686, country: 'Svédország' },
    { name: 'Oslo', latitude: 59.9139, longitude: 10.7522, country: 'Norvégia' },
    { name: 'Helsinki', latitude: 60.1699, longitude: 24.9384, country: 'Finnország' },
    { name: 'Reykjavík', latitude: 64.1355, longitude: -21.8954, country: 'Izland' },
    { name: 'Luxemburg', latitude: 49.6117, longitude: 6.1319, country: 'Luxemburg' },

    // Közép- és Kelet-Európa
    { name: 'Prága', latitude: 50.0755, longitude: 14.4378, country: 'Csehország' },
    { name: 'Varsó', latitude: 52.2297, longitude: 21.0122, country: 'Lengyelország' },
    { name: 'Pozsony', latitude: 48.1486, longitude: 17.1077, country: 'Szlovákia' },
    { name: 'Zágráb', latitude: 45.8150, longitude: 15.9819, country: 'Horvátország' },
    { name: 'Ljubljana', latitude: 46.0569, longitude: 14.5058, country: 'Szlovénia' },
    { name: 'Belgrád', latitude: 44.7866, longitude: 20.4489, country: 'Szerbia' },
    { name: 'Szarajevó', latitude: 43.8563, longitude: 18.4131, country: 'Bosznia-Hercegovina' },
    { name: 'Bukarest', latitude: 44.4268, longitude: 26.1025, country: 'Románia' },
    { name: 'Szófia', latitude: 42.6977, longitude: 23.3219, country: 'Bulgária' },
    { name: 'Szkopje', latitude: 41.9981, longitude: 21.4254, country: 'Észak-Macedónia' },
    { name: 'Tirana', latitude: 41.3275, longitude: 19.8187, country: 'Albánia' },
    { name: 'Podgorica', latitude: 42.4304, longitude: 19.2594, country: 'Montenegró' },
    { name: 'Pristina', latitude: 42.6629, longitude: 21.1655, country: 'Koszovó' },
    { name: 'Chisinau', latitude: 47.0105, longitude: 28.8638, country: 'Moldova' },
    { name: 'Kijev', latitude: 50.4501, longitude: 30.5234, country: 'Ukrajna' },
    { name: 'Minszk', latitude: 53.9045, longitude: 27.5615, country: 'Fehéroroszország' },
    { name: 'Vilnius', latitude: 54.6872, longitude: 25.2797, country: 'Litvánia' },
    { name: 'Riga', latitude: 56.9496, longitude: 24.1052, country: 'Lettország' },
    { name: 'Tallinn', latitude: 59.4370, longitude: 24.7536, country: 'Észtország' },
    { name: 'Moszkva', latitude: 55.7558, longitude: 37.6173, country: 'Oroszország' },
    { name: 'Szentpétervár', latitude: 59.9343, longitude: 30.3351, country: 'Oroszország' },

    // Balkán / Mediterrán
    { name: 'Athén', latitude: 37.9838, longitude: 23.7275, country: 'Görögország' },
    { name: 'Nicosia', latitude: 35.1856, longitude: 33.3823, country: 'Ciprus' },
    { name: 'Valletta', latitude: 35.8997, longitude: 14.5147, country: 'Málta' },
    { name: 'Andorra la Vella', latitude: 42.5063, longitude: 1.5218, country: 'Andorra' },
    { name: 'Monaco', latitude: 43.7384, longitude: 7.4246, country: 'Monaco' },
    { name: 'San Marino', latitude: 43.9424, longitude: 12.4578, country: 'San Marino' },
    { name: 'Vatikán', latitude: 41.9029, longitude: 12.4534, country: 'Vatikán' },

    // Ázsia
    { name: 'Ankara', latitude: 39.9334, longitude: 32.8597, country: 'Törökország' },
    { name: 'Isztambul', latitude: 41.0082, longitude: 28.9784, country: 'Törökország' },
    { name: 'Bagdad', latitude: 33.3152, longitude: 44.3661, country: 'Irak' },
    { name: 'Teherán', latitude: 35.6892, longitude: 51.3890, country: 'Irán' },
    { name: 'Rijád', latitude: 24.6877, longitude: 46.7219, country: 'Szaúd-Arábia' },
    { name: 'Dubai', latitude: 25.2048, longitude: 55.2708, country: 'Egyesült Arab Emírségek' },
    { name: 'Peking', latitude: 39.9042, longitude: 116.4074, country: 'Kína' },
    { name: 'Sanghaj', latitude: 31.2304, longitude: 121.4737, country: 'Kína' },
    { name: 'Tokió', latitude: 35.6762, longitude: 139.6503, country: 'Japán' },
    { name: 'Szöul', latitude: 37.5665, longitude: 126.9780, country: 'Dél-Korea' },
    { name: 'Újdelhi', latitude: 28.6139, longitude: 77.2090, country: 'India' },
    { name: 'Mumbai', latitude: 19.0760, longitude: 72.8777, country: 'India' },
    { name: 'Bangkok', latitude: 13.7563, longitude: 100.5018, country: 'Thaiföld' },
    { name: 'Szingapúr', latitude: 1.3521, longitude: 103.8198, country: 'Szingapúr' },
    { name: 'Jakarta', latitude: -6.2088, longitude: 106.8456, country: 'Indonézia' },
    { name: 'Manilla', latitude: 14.5995, longitude: 120.9842, country: 'Fülöp-szigetek' },
    { name: 'Kuala Lumpur', latitude: 3.1390, longitude: 101.6869, country: 'Malajzia' },
    { name: 'Hanoi', latitude: 21.0278, longitude: 105.8342, country: 'Vietnám' },
    { name: 'Phnom Penh', latitude: 11.5564, longitude: 104.9282, country: 'Kambodzsa' },
    { name: 'Colombo', latitude: 6.9271, longitude: 79.8612, country: 'Srí Lanka' },
    { name: 'Kabul', latitude: 34.5553, longitude: 69.2075, country: 'Afganisztán' },
    { name: 'Iszlamabad', latitude: 33.7294, longitude: 73.0931, country: 'Pakisztán' },
    { name: 'Dakka', latitude: 23.8103, longitude: 90.4125, country: 'Banglades' },
    { name: 'Ulánbátor', latitude: 47.8864, longitude: 106.9057, country: 'Mongólia' },
    { name: 'Tbiliszi', latitude: 41.6938, longitude: 44.8015, country: 'Grúzia' },
    { name: 'Jereván', latitude: 40.1792, longitude: 44.4991, country: 'Örményország' },
    { name: 'Baku', latitude: 40.4093, longitude: 49.8671, country: 'Azerbajdzsán' },
    { name: 'Nur-Szultan', latitude: 51.1801, longitude: 71.4460, country: 'Kazahsztán' },
    { name: 'Taskent', latitude: 41.2995, longitude: 69.2401, country: 'Üzbegisztán' },

    // Afrika
    { name: 'Kairó', latitude: 30.0444, longitude: 31.2357, country: 'Egyiptom' },
    { name: 'Addisz-Abeba', latitude: 9.0320, longitude: 38.7469, country: 'Etiópia' },
    { name: 'Nairobi', latitude: -1.2921, longitude: 36.8219, country: 'Kenya' },
    { name: 'Lagos', latitude: 6.5244, longitude: 3.3792, country: 'Nigéria' },
    { name: 'Abuja', latitude: 9.0765, longitude: 7.3986, country: 'Nigéria' },
    { name: 'Johannesburg', latitude: -26.2041, longitude: 28.0473, country: 'Dél-Afrika' },
    { name: 'Fokváros', latitude: -33.9249, longitude: 18.4241, country: 'Dél-Afrika' },
    { name: 'Pretória', latitude: -25.7479, longitude: 28.2293, country: 'Dél-Afrika' },
    { name: 'Akkra', latitude: 5.6037, longitude: -0.1870, country: 'Ghána' },
    { name: 'Dakar', latitude: 14.7167, longitude: -17.4677, country: 'Szenegál' },
    { name: 'Rabat', latitude: 34.0209, longitude: -6.8416, country: 'Marokkó' },
    { name: 'Tunisz', latitude: 36.8188, longitude: 10.1658, country: 'Tunézia' },
    { name: 'Algír', latitude: 36.7372, longitude: 3.0865, country: 'Algéria' },
    { name: 'Tripolisz', latitude: 32.8872, longitude: 13.1913, country: 'Líbia' },
    { name: 'Kartúm', latitude: 15.5007, longitude: 32.5599, country: 'Szudán' },
    { name: 'Luanda', latitude: -8.8368, longitude: 13.2343, country: 'Angola' },
    { name: 'Dar es-Salaam', latitude: -6.7924, longitude: 39.2083, country: 'Tanzánia' },
    { name: 'Kampala', latitude: 0.3476, longitude: 32.5825, country: 'Uganda' },

    // Amerika
    { name: 'New York', latitude: 40.7128, longitude: -74.0060, country: 'USA' },
    { name: 'Washington D.C.', latitude: 38.9072, longitude: -77.0369, country: 'USA' },
    { name: 'Los Angeles', latitude: 34.0522, longitude: -118.2437, country: 'USA' },
    { name: 'Chicago', latitude: 41.8781, longitude: -87.6298, country: 'USA' },
    { name: 'Ottawa', latitude: 45.4215, longitude: -75.6972, country: 'Kanada' },
    { name: 'Toronto', latitude: 43.6532, longitude: -79.3832, country: 'Kanada' },
    { name: 'Mexikóváros', latitude: 19.4326, longitude: -99.1332, country: 'Mexikó' },
    { name: 'Havanna', latitude: 23.1136, longitude: -82.3666, country: 'Kuba' },
    { name: 'Bogotá', latitude: 4.7110, longitude: -74.0721, country: 'Kolumbia' },
    { name: 'Caracas', latitude: 10.4806, longitude: -66.9036, country: 'Venezuela' },
    { name: 'Quito', latitude: -0.1807, longitude: -78.4678, country: 'Ecuador' },
    { name: 'Lima', latitude: -12.0464, longitude: -77.0428, country: 'Peru' },
    { name: 'La Paz', latitude: -16.5000, longitude: -68.1500, country: 'Bolívia' },
    { name: 'Santiago', latitude: -33.4489, longitude: -70.6693, country: 'Chile' },
    { name: 'Buenos Aires', latitude: -34.6037, longitude: -58.3816, country: 'Argentína' },
    { name: 'Montevideo', latitude: -34.9011, longitude: -56.1645, country: 'Uruguay' },
    { name: 'Brazíliaváros', latitude: -15.7801, longitude: -47.9292, country: 'Brazília' },
    { name: 'Rio de Janeiro', latitude: -22.9068, longitude: -43.1729, country: 'Brazília' },
    { name: 'Asunción', latitude: -25.2867, longitude: -57.6470, country: 'Paraguay' },
    { name: 'Georgetown', latitude: 6.8013, longitude: -58.1551, country: 'Guyana' },
    { name: 'Panama City', latitude: 8.9936, longitude: -79.5197, country: 'Panama' },
    { name: 'San José', latitude: 9.9281, longitude: -84.0907, country: 'Costa Rica' },
    { name: 'Kingston', latitude: 17.9970, longitude: -76.7936, country: 'Jamaica' },

    // Óceánia
    { name: 'Canberra', latitude: -35.2809, longitude: 149.1300, country: 'Ausztrália' },
    { name: 'Sydney', latitude: -33.8688, longitude: 151.2093, country: 'Ausztrália' },
    { name: 'Wellington', latitude: -41.2866, longitude: 174.7756, country: 'Új-Zéland' },
    { name: 'Suva', latitude: -18.1248, longitude: 178.4501, country: 'Fidzsi' },
];

async function seed() {
    try {
        await sequelize.sync({ force: false });
        await cityTable.bulkCreate(cities);
        console.log('✅ Városok sikeresen hozzáadva!');
        process.exit();
    } catch (error) {
        console.error('❌ Hiba a feltöltés során:', error);
        process.exit(1);
    }
}

seed();