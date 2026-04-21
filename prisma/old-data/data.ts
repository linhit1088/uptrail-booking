
import { Tour, Leader, Article, User, SiteConfig, Testimonial } from './types';

export const MOODS = [
  { id: 'Chữa lành', label: 'Chữa lành', icon: '🌿', desc: 'Tìm về bình yên, lắng nghe chính mình giữa thiên nhiên.' },
  { id: 'Chinh phục', label: 'Chinh phục', icon: '🏔️', desc: 'Vượt qua giới hạn bản thân, chạm tay vào những đỉnh cao.' },
  { id: 'Săn mây', label: 'Săn mây', icon: '☁️', desc: 'Khoảnh khắc biển mây bồng bềnh ngay dưới chân.' },
  { id: 'Thử thách', label: 'Thử thách', icon: '🔥', desc: 'Những cung đường đòi hỏi kỹ năng và ý chí bền bỉ.' },
  { id: 'Thong dong', label: 'Thong dong', icon: '🐢', desc: 'Thong dong tận hưởng từng hơi thở của núi rừng, không vội vã.' },
  { id: 'Ngắm hoa', label: 'Ngắm hoa', icon: '🌸', desc: 'Lạc bước giữa những mùa hoa rực rỡ của núi rừng Tây Bắc.' },
  { id: 'Mạo hiểm', label: 'Mạo hiểm', icon: '🧗', desc: 'Những hành trình dành cho những trái tim dũng cảm.' },
  { id: 'Khám phá', label: 'Khám phá', icon: '🔭', desc: 'Tìm tòi những vùng đất mới lạ và bí ẩn.' },
  { id: 'Văn hóa', label: 'Văn hóa', icon: '🏮', desc: 'Trải nghiệm cuộc sống và phong tục của người dân bản địa.' },
];

export const LEADERS: Leader[] = [
  {
    id: 'l1',
    name: 'A Páo',
    role: 'Local Expert',
    bio: 'Chàng trai người Mông sinh ra dưới chân núi Tà Chì Nhù. A Páo không chỉ thuộc từng ngọn cây, hốc đá mà còn là người kể chuyện duyên dáng về văn hóa bản địa. Sức khỏe phi thường và nụ cười luôn nở trên môi.',
    tripsCount: 200,
    specialties: ['Thông thạo địa hình', 'Văn hóa bản địa', 'Sinh tồn'],
    avatar: 'https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?q=80&w=1974&auto=format&fit=crop',
    rating: 5.0,
    personality: ['Chân thành', 'Nhiệt huyết', 'Vui vẻ'],
    feedbacks: [
      { user: 'Tuấn Hưng', comment: 'A Páo đi rừng như đi dạo, hỗ trợ đoàn cực tốt.', tourName: 'Tà Chì Nhù' }
    ]
  },
  {
    id: 'l2',
    name: 'Trần Minh',
    role: 'Senior Leader / Founder',
    bio: '10 năm kinh nghiệm leo núi và hoạt động cứu hộ. Minh tin rằng leo núi không phải để chinh phục thiên nhiên, mà để chinh phục chính mình. Anh là người cực kỳ kỹ tính về quy trình an toàn.',
    tripsCount: 150,
    specialties: ['Sơ cấp cứu (WFA)', 'Nhiếp ảnh', 'Tâm lý'],
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop',
    rating: 4.9,
    personality: ['Điềm tĩnh', 'Tin cậy', 'Sâu sắc'],
    feedbacks: [
        { user: 'Lan Chi', comment: 'Cảm giác an toàn tuyệt đối khi đi cùng anh Minh.', tourName: 'Kỳ Quan San' }
    ]
  },
  {
    id: 'l3',
    name: 'Hạnh "Mây"',
    role: 'Happiness Leader',
    bio: 'Cô gái nhỏ nhắn nhưng sức bền đáng nể. Hạnh mang đến năng lượng chữa lành, những bữa ăn ngon và những buổi workshop thiền/yoga ngẫu hứng giữa rừng già.',
    tripsCount: 80,
    specialties: ['Yoga/Thiền', 'Nấu ăn', 'Chăm sóc'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
    rating: 5.0,
    personality: ['Nhẹ nhàng', 'Chu đáo', 'Tinh tế'],
    feedbacks: [
        { user: 'Thùy Dung', comment: 'Chị Hạnh tâm lý lắm, nhờ chị mà em vượt qua được dốc Ba Giờ.', tourName: 'Tả Liên Sơn' }
    ]
  }
];

// --- CẤU HÌNH DỮ LIỆU CHUNG (TIÊU CHUẨN CAO CẤP) ---
const COMMON_INCLUDES = [
    'Xe giường nằm chất lượng cao khứ hồi (Hà Nội - Điểm tập kết).',
    'Xe trung chuyển đưa đón 2 chiều từ điểm tập kết vào chân núi.',
    'Các bữa ăn đầy đủ dinh dưỡng (Sáng, Trưa, Tối). Đặc biệt bữa tối lẩu/nướng thịnh soạn với đặc sản địa phương.',
    'Nước uống: Cung cấp 1.5 lít nước/khách vào ngày đầu tiên. Tại lán có nước lọc đun sôi miễn phí.',
    'Lưu trú: Ngủ lán gỗ cách nhiệt hoặc lều trại tiêu chuẩn châu Âu (tùy cung), có chăn bông dày, gối, tấm trải cách nhiệt.',
    'Nhân sự: Leader kinh nghiệm từ Hà Nội (có chứng chỉ sơ cứu) và đội ngũ Porter người bản địa (tỉ lệ 3 khách/1 porter) mang vác đồ chung và 3kg đồ cá nhân cho khách.',
    'Dịch vụ tắm lá thuốc người Dao đỏ hoặc tắm khoáng nóng (tùy địa điểm) phục hồi sức khỏe sau khi xuống núi.',
    'Bảo hiểm du lịch mạo hiểm mức trách nhiệm tối đa 100.000.000đ/người/vụ.',
    'Bộ Kit leo núi (mượn): Gậy leo núi, áo mưa tiện lợi, găng tay hạt nhựa, đèn pin đội đầu.',
    'Y tế: Tủ thuốc sơ cấp cứu tiêu chuẩn, bình oxy mini (cho các cung cao trên 3000m) và các thiết bị hỗ trợ y tế cơ bản.',
    'Kỷ niệm chương (Medal) thiết kế độc quyền và Giấy chứng nhận chinh phục từ Uptrail.'
];

const COMMON_PREPARES = [
    'Balo leo núi chuyên dụng (20-30L) có đai trợ lực để đựng đồ cá nhân trong ngày.',
    'Giày trekking: Đế gai sâu, độ bám tốt, chống thấm nước càng tốt. Nên mua rộng hơn chân 0.5 - 1 size để tránh đau ngón chân khi xuống dốc.',
    'Trang phục: 2-3 bộ quần áo mau khô (thoát mồ hôi tốt), 1 áo khoác gió 2 lớp chống thấm, 1 áo giữ nhiệt (nếu đi mùa đông), mũ tai bèo/mũ len.',
    'Phụ kiện cá nhân: Khăn đa năng, găng tay chống nắng, tất dài (dày), kính râm, miếng dán giữ nhiệt.',
    'Đồ vệ sinh cá nhân: Kem đánh răng, bàn chải, khăn mặt, kem chống nắng, thuốc cá nhân (dị ứng, đau bụng...).',
    'Đồ ăn vặt bổ sung năng lượng theo sở thích: Socola, lương khô, gel năng lượng, kẹo gừng.'
];

const COMMON_POLICY = {
    cancellation: [
        'Hủy tour trước 15 ngày khởi hành: Hoàn 100% tiền cọc.',
        'Hủy tour từ 8-14 ngày trước khởi hành: Hoàn 50% tiền cọc.',
        'Hủy tour trong vòng 7 ngày trước khởi hành: Không hoàn tiền cọc.',
        'Trường hợp thiên tai, bão lũ, dịch bệnh (cấm di chuyển): Bảo lưu tiền cọc định danh trong 6 tháng hoặc hoàn tiền 100%.'
    ],
    reschedule: [
        'Hỗ trợ đổi ngày khởi hành miễn phí 01 lần nếu báo trước 10 ngày.',
        'Báo đổi ngày trong vòng 5-9 ngày: Phí đổi 20% giá tour.',
        'Không hỗ trợ đổi ngày trong vòng 5 ngày trước khởi hành để đảm bảo công tác chuẩn bị.'
    ],
    note: 'Lịch trình thực tế có thể thay đổi nhẹ tùy thuộc vào điều kiện thời tiết và sức khỏe của các thành viên trong đoàn để đảm bảo an toàn tuyệt đối. Quyết định của Leader là quyết định cuối cùng trong các tình huống khẩn cấp.'
};

// --- DANH SÁCH 16 TOUR CHI TIẾT ---
export const TOURS: Tour[] = [
  // 1. KỲ QUAN SAN
  {
    id: 'ky-quan-san',
    name: 'Kỳ Quan San',
    shortDesc: 'Đỉnh núi cao thứ 4 Việt Nam (3046m). Hành trình 3 ngày 2 đêm săn mây huyền thoại và ngắm bình minh đẹp nhất Tây Bắc.',
    tagline: 'Bình minh trên biển mây',
    story: 'Kỳ Quan San (hay Bạch Mộc Lương Tử) là ranh giới tự nhiên giữa hai tỉnh Lào Cai và Lai Châu. Đây là đỉnh núi cao thứ 4 tại Việt Nam với độ cao 3.046m. Hành trình chinh phục Kỳ Quan San nổi tiếng với địa hình đa dạng: từ những khu rừng tre trúc rậm rạp, những con suối mát lạnh đến "Sống lưng khủng long" hùng vĩ nằm cheo leo giữa trời. Đặc biệt, bình minh trên đỉnh Núi Muối được mệnh danh là khoảnh khắc đắt giá nhất của đời người leo núi, nơi mặt trời mọc lên từ biển mây cuồn cuộn.',
    moods: ['Chinh phục', 'Săn mây', 'Ngắm hoa'],
    difficulty: 4,
    durationDays: 3,
    location: 'Bát Xát, Lào Cai',
    price: 3950000,
    featuredImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
    gallery: [
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop'
    ],
    nextDeparture: '2023-11-15',
    slotsTotal: 22,
    slotsTaken: 12,
    highlights: ['Bình minh trên Núi Muối đẹp nhất Tây Bắc', 'Trải nghiệm xích đu gỗ giữa trời', 'Sống lưng khủng long hùng vĩ', 'Rừng tre trúc bạt ngàn như phim kiếm hiệp'],
    checkpoints: [
      { name: 'Sàng Ma Sáo', altitude: '1000m', feeling: 'Hào hứng bắt đầu', fatigueLevel: 2, image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2073&auto=format&fit=crop' },
      { name: 'Núi Muối', altitude: '2100m', feeling: 'Choáng ngợp trước biển mây', fatigueLevel: 6, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop' },
      { name: 'Đỉnh Ky Quan San', altitude: '3046m', feeling: 'Vỡ òa chiến thắng', fatigueLevel: 9, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop' },
    ],
    leaderId: 'l2',
    includes: COMMON_INCLUDES,
    prepares: COMMON_PREPARES,
    notIncluded: ['Thuế VAT (nếu lấy hóa đơn)', 'Tiền TIP cho Porter/Leader (tùy tâm)', 'Chi phí ăn uống cá nhân ngoài chương trình'],
    policy: COMMON_POLICY,
    itinerary: [
      { day: 'Đêm 0', title: 'Hà Nội - Sapa', desc: '22:30: Xe giường nằm đón quý khách tại điểm hẹn Hà Nội (Bến xe Mỹ Đình hoặc văn phòng xe). Quý khách nghỉ đêm trên xe.' },
      { day: 'Ngày 1', title: 'Sapa - Sàng Ma Sáo - Lán Núi Muối', desc: '05:30: Đến Sapa, vệ sinh cá nhân và ăn sáng tại nhà hàng.\n07:30: Xe 16/29 chỗ đưa đoàn di chuyển vào xã Sàng Ma Sáo (huyện Bát Xát).\n09:30: Đến điểm tập kết Ky Quan San, gặp gỡ đội ngũ Porter, phân chia đồ đạc và bắt đầu trekking.\n12:00: Đoàn nghỉ ăn trưa picnic bên suối.\n16:30: Đến điểm hạ trại tại lán Núi Muối (2100m). Nhận chỗ ngủ, nghỉ ngơi.\n18:30: Thưởng thức bữa tối lẩu nóng hổi, giao lưu văn nghệ và ngắm bầu trời đầy sao.' },
      { day: 'Ngày 2', title: 'Lán - Đỉnh Kỳ Quan San - Lán', desc: '04:00: Báo thức, vệ sinh cá nhân và dùng bữa sáng.\n05:00: Xuất phát chinh phục đỉnh. Quãng đường dốc và đi qua sống lưng khủng long.\n06:30: Đón bình minh tuyệt đẹp trên sống lưng khủng long.\n09:00: Chạm tay vào cột mốc Kỳ Quan San 3046m. Check-in, ăn mừng chiến thắng.\n12:30: Quay về lán nghỉ dùng bữa trưa.\nChiều: Quý khách tự do dạo chơi quanh khu vực lán, chụp ảnh xích đu và săn biển mây chiều.' },
      { day: 'Ngày 3', title: 'Lán - Sàng Ma Sáo - Sapa - Hà Nội', desc: '05:30: Dậy sớm đón bình minh lần 2 ngay tại lán. Ăn sáng và thu dọn hành lý.\n07:30: Bắt đầu xuống núi theo đường cũ.\n11:30: Về đến chân núi. Xe đón đoàn quay trở lại Sapa.\n16:00: Tới Sapa, quý khách ngâm mình trong bồn tắm lá thuốc người Dao đỏ để phục hồi sức khỏe.\n18:00: Ăn tối liên hoan với lẩu cá tầm/cá hồi đặc sản Sapa.\n22:30: Lên xe giường nằm khởi hành về Hà Nội. Kết thúc hành trình.' }
    ],
    summary: { bestMonths: "Tháng 9 - Tháng 5 năm sau", maxGroupSize: "22 khách", pickupTime: "22:30 PM - Tối thứ 5 hàng tuần", meetingPoint: "Hà Nội", durationDesc: "3 ngày 2 đêm", stats: { medicalAccess: { score: 5, value: "5,5 giờ" }, distance: { score: 8, value: "27km" }, activityTime: { score: 9, value: "11 giờ/ngày" }, elevationGain: { score: 9, value: "2,485m" }, peakAltitude: { score: 9, value: "3,046m" } } },
    faq: [
        { question: "Cung này có khó không?", answer: "Độ khó 4/5. Dốc dài và liên tục, đặc biệt là ngày lên đỉnh cần thể lực tốt và sự bền bỉ." },
        { question: "Lán nghỉ như thế nào?", answer: "Lán gỗ do người dân dựng, kín gió, có chăn bông ấm và chiếu cách nhiệt. Ngủ tập thể nam nữ riêng khu vực." },
        { question: "Có sóng điện thoại không?", answer: "Sóng Viettel có chập chờn ở khu vực lán nghỉ và trên đỉnh, còn lại trong rừng sóng rất yếu hoặc mất sóng." }
    ]
  },
  // 2. LẢO THẨN
  {
    id: 'lao-than',
    name: 'Lảo Thẩn',
    shortDesc: 'Nóc nhà Y Tý, cung đường săn mây dễ dàng và đẹp nhất cho người mới bắt đầu.',
    tagline: 'Nóc nhà Y Tý',
    story: 'Lảo Thẩn (2860m) được mệnh danh là nơi "mây luồn qua kẽ tóc". Cung đường này được đánh giá là đẹp, dễ đi, ít dốc gắt, view cực thoáng. Đây là lựa chọn hoàn hảo cho lần trekking đầu tiên, nơi bạn có thể ngắm nhìn hoàng hôn rực lửa và bình minh trên biển mây mà không cần tốn quá nhiều sức lực.',
    moods: ['Săn mây','Chữa lành','Thong dong'],
    difficulty: 2,
    durationDays: 2,
    location: 'Y Tý, Lào Cai',
    price: 3200000,
    featuredImage: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069'],
    nextDeparture: '2023-11-18',
    slotsTotal: 22,
    slotsTaken: 5,
    highlights: ['Săn mây Y Tý','Đồi cỏ cháy mênh mông','Mỏm đá câu cá sống ảo','Hoàng hôn đỉnh cao'],
    leaderId: 'l3',
    includes: COMMON_INCLUDES,
    prepares: COMMON_PREPARES,
    policy: COMMON_POLICY,
    itinerary: [
        {day:'Đêm 0',title:'Hà Nội - Sapa',desc:'22:30: Xe đón tại Hà Nội đi Sapa.'},
        {day:'Ngày 1',title:'Sapa - Y Tý - Lán A Hờ',desc:'07:00: Xe 16 chỗ đưa đoàn đi Y Tý (khoảng 3h).\n10:00: Đến Phìn Hồ, bắt đầu trek. Đường thoải, đi qua đồi cỏ cháy.\n12:30: Ăn trưa.\n15:30: Tới lán A Hờ. Leo lên đồi trống ngắm hoàng hôn rực rỡ nhất Tây Bắc.\n18:00: Ăn tối.'},
        {day:'Ngày 2',title:'Đỉnh - Sapa - Hà Nội',desc:'04:30: Dậy sớm, leo khoảng 1 tiếng lên đỉnh 2860m săn mây.\n07:30: Quay về lán ăn sáng, thu đồ.\n12:00: Về đến bản Phìn Hồ. Ăn trưa tại Y Tý.\n16:00: Về Sapa tắm lá thuốc.\n23:00: Xe về Hà Nội.'}
    ],
    checkpoints: [{name:'Lán A Hờ', altitude:'2560m', feeling:'Chill', fatigueLevel:4}],
    summary: { bestMonths: "Tháng 9 - Tháng 4", maxGroupSize: "22 khách", pickupTime: "22:30 PM - Tối thứ 6", meetingPoint: "Hà Nội", durationDesc: "2 ngày 1 đêm", stats: { medicalAccess: {score:8, value:"2 giờ"}, distance:{score:4, value:"14km"}, activityTime:{score:5, value:"5 giờ/ngày"}, elevationGain:{score:4, value:"800m"}, peakAltitude:{score:6, value:"2,860m"} } },
    faq: [{question:"Trẻ em đi được không?", answer:"Trẻ em từ 7 tuổi trở lên có thể tham gia tốt cung đường này."}]
  },
  // 3. NHÌU CỒ SAN
  {
    id: 'nhiu-co-san',
    name: 'Nhìu Cồ San',
    shortDesc: 'Sừng Trâu Dũng Mãnh - Cung đường của hoa đỗ quyên, thác nước hùng vĩ và đường đá cổ.',
    tagline: 'Sừng Trâu Dũng Mãnh',
    story: 'Nhìu Cồ San (Sừng Trâu) là đỉnh núi cao thứ 9 tại Việt Nam (2.965m). Nổi tiếng với Thác Ong Chúa hùng vĩ đổ từ vách núi dựng đứng và rừng hoa đỗ quyên rực rỡ vào mùa xuân. Cung đường còn đi qua một đoạn của con đường đá cổ Pavi xưa kia người Pháp xây dựng nối liền Bát Xát và Lai Châu.',
    moods: ['Chinh phục','Săn mây','Ngắm hoa'],
    difficulty: 3,
    durationDays: 2,
    location: 'Sàng Ma Sáo, Lào Cai',
    price: 3200000,
    featuredImage: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?q=80&w=2070&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?q=80&w=2070'],
    nextDeparture: '2023-11-22',
    slotsTotal: 20,
    slotsTaken: 8,
    highlights: ['Thác Ong Chúa đẹp nhất Tây Bắc','Rừng đỗ quyên cổ thụ','Bãi thả dê trên núi','Con đường đá cổ Pavi'],
    leaderId: 'l2',
    includes: COMMON_INCLUDES,
    prepares: COMMON_PREPARES,
    policy: COMMON_POLICY,
    itinerary: [
        {day:'Đêm 0',title:'Hà Nội – Sapa',desc:'22:30: Xe giường nằm đón đoàn đi Sapa. Nghỉ đêm trên xe.'},
        {day:'Ngày 1',title:'Sapa – Thác Ong Chúa - Lán',desc:'06:00: Đến Sapa, ăn sáng.\n07:00: Xe trung chuyển đưa đoàn vào Sàng Ma Sáo.\n09:00: Bắt đầu trekking. Đường đi qua bản làng người Mông, suối lớn và đặc biệt là Thác Ong Chúa hùng vĩ.\n12:00: Ăn trưa.\n16:00: Tới lán nghỉ 2400m. Lán nằm ở vị trí kín gió, view thoáng.'},
        {day:'Ngày 2',title:'Lán – Đỉnh – Hà Nội',desc:'04:00: Dậy sớm, ăn sáng và leo đỉnh đón bình minh.\n06:30: Check-in đỉnh 2965m. Ngắm nhìn Bạch Mộc Lương Tử và Lảo Thẩn từ xa.\n08:00: Xuống núi theo đường Bãi Thả Dê.\n12:00: Về đến bản, xe đón về Sapa.\n15:00: Tắm lá thuốc, ăn tối.\n23:00: Về đến Hà Nội.'}
    ],
    checkpoints: [{name:'Thác Ong Chúa', altitude:'1600m', feeling:'Hùng vĩ', fatigueLevel:3}],
    summary: { bestMonths: "Tháng 11 - Tháng 4", maxGroupSize: "20 khách", pickupTime: "22:30 PM - Tối thứ 6", meetingPoint: "Hà Nội", durationDesc: "2 ngày 2 đêm", stats: { medicalAccess: {score:6, value:"4h"}, distance:{score:6, value:"20km"}, activityTime:{score:7, value:"8h/ngày"}, elevationGain:{score:7, value:"1900m"}, peakAltitude:{score:8, value:"2965m"} } },
    faq: [{question:"Thác Ong Chúa tắm được không?", answer:"Nước rất lạnh và chảy xiết từ trên cao xuống, rất nguy hiểm, không nên tắm."}]
  },
  // 4. LÙNG CÚNG
  {
    id: 'lung-cung',
    name: 'Lùng Cúng',
    shortDesc: 'Thảo nguyên xanh mát giữa đại dương mây, chinh phục đỉnh cao thứ 11 Việt Nam.',
    tagline: 'Đại Dương Mây',
    story: 'Lùng Cúng (2913m) có điểm đặc biệt nhất là đỉnh núi có một bãi đất phẳng rộng mênh mông như sân bóng, nơi bạn có thể chạy nhảy, thả diều giữa biển mây bồng bềnh. Cung đường đi qua những bản làng bình yên của người Thái, rừng táo mèo cổ thụ và thung lũng Tu San đẹp như tranh vẽ.',
    moods: ['Săn mây','Chữa lành','Thong dong'],
    difficulty: 3,
    durationDays: 2,
    location: 'Mù Cang Chải, Yên Bái',
    price: 3200000,
    featuredImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070'],
    nextDeparture: '2023-11-30',
    slotsTotal: 25,
    slotsTaken: 10,
    highlights: ['Sân bay (thảo nguyên) trên đỉnh núi','Rừng táo mèo cổ thụ','Thung lũng Tu San','Bản làng người Thái'],
    leaderId: 'l1',
    includes: COMMON_INCLUDES,
    prepares: COMMON_PREPARES,
    policy: COMMON_POLICY,
    itinerary: [
        {day:'Đêm 0',title:'Hà Nội - Tú Lệ',desc:'22:00: Xe đón đoàn đi Tú Lệ (Yên Bái).\n02:30: Đến Tú Lệ, nhận phòng homestay ngủ bù.'},
        {day:'Ngày 1',title:'Tú Lệ - Tu San - Lán',desc:'07:00: Ăn sáng với xôi nếp Tú Lệ trứ danh.\n08:00: Di chuyển bằng xe ôm offroad vào bản Tu San (15km) - trải nghiệm cảm giác mạnh.\n09:30: Bắt đầu trekking. Đi qua rừng táo mèo, đồi cỏ lau.\n16:00: Tới lán 2500m. Lán nằm ở vị trí rất thoáng, gió mạnh.'},
        {day:'Ngày 2',title:'Đỉnh - Lùng Cúng - Hà Nội',desc:'05:00: Leo dốc lên đỉnh 2913m.\n06:30: Đón bình minh, thả diều, chụp ảnh sống ảo trên "sân bay".\n09:00: Xuống núi theo hướng bản Lùng Cúng.\n15:00: Về Tú Lệ, tắm khoáng nóng, mua cốm làm quà.\n17:00: Lên xe về Hà Nội.'}
    ],
    checkpoints: [{name:'Đỉnh Lùng Cúng', altitude:'2913m', feeling:'Tự do', fatigueLevel:7}],
    summary: { bestMonths: "Tháng 9 - Tháng 4", maxGroupSize: "20 khách", pickupTime: "22:00 PM - Tối thứ 6", meetingPoint: "Hà Nội", durationDesc: "2 ngày 1 đêm", stats: { medicalAccess: {score:6, value:"4 giờ"}, distance:{score:5, value:"18km"}, activityTime:{score:6, value:"6 giờ/ngày"}, elevationGain:{score:6, value:"1,200m"}, peakAltitude:{score:7, value:"2,913m"} } },
    faq: [{question:"Đi xe ôm vào bản có sợ không?", answer:"Đường khá xấu và dốc, cảm giác mạnh nhưng tay lái người bản địa rất cứng, bạn cứ yên tâm bám chắc."}]
  },
  // 5. TẢ LIÊN SƠN
  {
    id: 'ta-lien-son',
    name: 'Tả Liên Sơn',
    shortDesc: 'Khu rừng cổ tích đẹp nhất Tây Bắc với thảm rêu xanh và rừng phong đỏ rực.',
    tagline: 'Khu rừng cổ tích',
    story: 'Tả Liên Sơn (Cổ Trâu) sở hữu khu rừng nguyên sinh đẹp nhất nhì Tây Bắc. Những thân cây cổ thụ phủ kín rêu phong, mùa thu lá phong đỏ rực tạo nên khung cảnh như trong truyện cổ tích. Cung đường này không quá quan trọng việc lên đỉnh, mà quá trình đi xuyên qua khu rừng ma mị mới là trải nghiệm đáng giá nhất.',
    moods: ['Khám phá', 'Chữa lành', 'Ngắm hoa'],
    difficulty: 3,
    durationDays: 2,
    location: 'Tam Đường, Lai Châu',
    price: 3300000,
    featuredImage: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074'],
    nextDeparture: '2023-12-10',
    slotsTotal: 20,
    slotsTaken: 4,
    highlights: ['Rừng phong đỏ (T10-11)', 'Rừng già nguyên sinh', 'View thành phố Lai Châu lung linh về đêm', 'Hoa trà cổ thụ'],
    leaderId: 'l3',
    includes: COMMON_INCLUDES,
    prepares: COMMON_PREPARES,
    policy: COMMON_POLICY,
    itinerary: [
        {day:'Đêm 0',title:'Hà Nội - Sapa',desc:'22:00: Xe đón đi Sapa.'},
        {day:'Ngày 1',title:'Sapa - Tả Lèng - Lán',desc:'07:00: Di chuyển sang bản Tả Lèng (Lai Châu).\n09:00: Bắt đầu trekking. Đi xuyên qua rừng già cổ thụ rêu phong.\n12:00: Ăn trưa.\n16:00: Tới hốc đá/lán nghỉ 2400m. Khu vực này rừng rất đẹp.'},
        {day:'Ngày 2',title:'Đỉnh - Tả Lèng - Hà Nội',desc:'05:00: Lên đỉnh 2996m. Đoạn đường này cây cối rậm rạp, cần bám sát đoàn.\n08:00: Check-in đỉnh.\n12:00: Xuống núi ăn trưa.\n17:00: Về Sapa tắm lá thuốc, ăn lẩu thắng cố.\n23:00: Về HN.'}
    ],
    checkpoints: [{name:'Hốc đá', altitude:'2400m', feeling:'Bí ẩn', fatigueLevel:5}],
    summary: { bestMonths: "Tháng 10 - Tháng 4", maxGroupSize: "20 khách", pickupTime: "22:00 PM - Tối thứ 6", meetingPoint: "Hà Nội", durationDesc: "2 ngày 1 đêm", stats: { medicalAccess: {score:6, value:"4h"}, distance:{score:5, value:"16km"}, activityTime:{score:6, value:"6h/ngày"}, elevationGain:{score:6, value:"1400m"}, peakAltitude:{score:7, value:"2996m"} } },
    faq: [{question:"Có phải leo dốc nhiều không?", answer:"Độ dốc vừa phải nhưng đường đi trong rừng rậm rạp, cần chú ý rễ cây."}]
  },
  // 6. TÀ CHÌ NHÙ (TRẠM TẤU)
  {
    id: 'ta-chi-nhu-tram-tau',
    name: 'Tà Chì Nhù (Trạm Tấu)',
    shortDesc: 'Cung đường truyền thống với dốc gắt liên tục. Thiên đường mây và hoa Chi Pâu tím.',
    tagline: 'Đại dương mây tím',
    story: 'Tà Chì Nhù hướng Trạm Tấu (Yên Bái) là cung đường "hành xác" nổi tiếng với nắng và gió. Tuy nhiên, phần thưởng là biển mây cuồn cuộn ngay dưới chân và cánh đồng hoa Chi Pâu tím biếc vào tháng 10. Đây là cung đường thử thách thể lực đáng gờm vì dốc gắt và ít bóng cây.',
    moods: ['Săn mây', 'Ngắm hoa', 'Thử thách'],
    difficulty: 4,
    durationDays: 2,
    location: 'Trạm Tấu, Yên Bái',
    price: 3100000,
    featuredImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2174&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2174'],
    nextDeparture: '2023-10-15',
    slotsTotal: 25,
    slotsTaken: 20,
    highlights: ['Hoa Chi Pâu tím (T9-10)', 'Biển mây đại dương', 'Dốc Chung huyền thoại', 'Đàn ngựa hoang trên núi'],
    leaderId: 'l1',
    includes: COMMON_INCLUDES,
    prepares: COMMON_PREPARES,
    policy: COMMON_POLICY,
    itinerary: [
        {day:'Đêm 0',title:'Hà Nội - Nghĩa Lộ',desc:'19:00: Xe đón đi Nghĩa Lộ (Yên Bái).\n00:00: Đến Nghĩa Lộ, ngủ khách sạn/homestay.'},
        {day:'Ngày 1',title:'Mỏ Chì - Lán Nghỉ',desc:'07:00: Ăn sáng, xe đưa vào Mỏ Chì (Xà Hồ).\n09:00: Bắt đầu leo. Dốc liên tục, đi qua các đồi trọc.\n12:00: Ăn trưa.\n16:30: Tới lán 2400m. Ngắm hoàng hôn biển mây tuyệt đẹp.'},
        {day:'Ngày 2',title:'Đỉnh - Mỏ Chì - Hà Nội',desc:'05:00: Lên đỉnh 2979m đón bình minh giữa đồi hoa tím.\n08:30: Xuống núi.\n14:00: Về đến Trạm Tấu, tắm khoáng nóng thư giãn.\n17:00: Lên xe về HN.'}
    ],
    checkpoints: [{name:'Đồi Chung', altitude:'1700m', feeling:'Dốc gắt', fatigueLevel:5}],
    summary: { bestMonths: "Tháng 10 - Tháng 11", maxGroupSize: "25 khách", pickupTime: "19:00 PM - Tối thứ 6", meetingPoint: "Hà Nội", durationDesc: "2 ngày 1 đêm", stats: { medicalAccess: {score:7, value:"3h"}, distance:{score:5, value:"18km"}, activityTime:{score:7, value:"7h/ngày"}, elevationGain:{score:8, value:"1700m"}, peakAltitude:{score:8, value:"2979m"} } },
    faq: [{question:"Có bóng cây không?", answer:"Rất ít cây, chủ yếu là đồi trọc và cỏ thấp, cần chuẩn bị mũ nón, kem chống nắng kỹ."}]
  },
  // 7. TÀ CHÌ NHÙ (NẬM NGHIỆP)
  {
    id: 'ta-chi-nhu-nam-nghiep',
    name: 'Tà Chì Nhù (Nậm Nghiệp)',
    shortDesc: 'Cung đường mới nhẹ nhàng hơn xuyên qua rừng Táo Mèo và Sơn Tra cổ thụ.',
    tagline: 'Miền cổ tích Sơn Tra',
    story: 'Xuất phát từ bản Nậm Nghiệp (Ngọc Chiến, Sơn La), cung đường này đi qua những khu rừng già rêu phong và rừng hoa Sơn Tra trắng muốt vào mùa xuân. Đường đi thoải hơn, ít dốc gắt hơn hướng Trạm Tấu, có suối và rừng trúc, phù hợp cho những ai muốn ngắm Tà Chì Nhù ở một góc nhìn lãng mạn, nhẹ nhàng hơn.',
    moods: ['Săn mây', 'Ngắm hoa', 'Khám phá'],
    difficulty: 3,
    durationDays: 2,
    location: 'Mường La, Sơn La',
    price: 3450000,
    featuredImage: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=2070&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=2070'],
    nextDeparture: '2024-03-10',
    slotsTotal: 20,
    slotsTaken: 5,
    highlights: ['Rừng Sơn Tra cổ thụ (T3)', 'Bản Nậm Nghiệp yên bình', 'Hoa Đỗ Quyên', 'Rừng trúc'],
    leaderId: 'l1',
    includes: COMMON_INCLUDES,
    prepares: COMMON_PREPARES,
    policy: COMMON_POLICY,
    itinerary: [
        {day:'Đêm 0',title:'Hà Nội - Ngọc Chiến',desc:'19:00: Xe đón đi Ngọc Chiến (Sơn La).\n01:00: Ngủ homestay bản Lướt.'},
        {day:'Ngày 1',title:'Nậm Nghiệp - Lán',desc:'07:00: Ăn sáng, di chuyển xe ôm lên bản Nậm Nghiệp cao nhất Việt Nam.\n09:00: Trekking qua rừng Sơn Tra cổ thụ. Đường dốc vừa phải, rợp bóng cây.\n16:00: Tới lán nghỉ.'},
        {day:'Ngày 2',title:'Đỉnh - Nậm Nghiệp - Hà Nội',desc:'05:30: Lên đỉnh 2979m.\n08:30: Xuống núi, ngắm nhìn bản làng từ trên cao.\n13:00: Tắm khoáng nóng Ngọc Chiến.\n15:00: Lên xe về HN.'}
    ],
    checkpoints: [{name:'Rừng Già', altitude:'2400m', feeling:'Mát mẻ', fatigueLevel:3}],
    summary: { bestMonths: "Tháng 3 (Sơn Tra), T9-10 (Chi Pâu)", maxGroupSize: "20 khách", pickupTime: "19:00 PM - Tối thứ 6", meetingPoint: "Hà Nội", durationDesc: "2 ngày 1 đêm", stats: { medicalAccess: {score:6, value:"4h"}, distance:{score:6, value:"20km"}, activityTime:{score:6, value:"6h/ngày"}, elevationGain:{score:5, value:"1200m"}, peakAltitude:{score:8, value:"2979m"} } },
    faq: [{question:"Hoa Sơn Tra nở tháng mấy?", answer:"Tháng 3 dương lịch là mùa hoa Sơn Tra (Táo mèo) nở trắng rừng."}]
  },
  // 8. PU TA LENG
  {
    id: 'pu-ta-leng',
    name: 'Pu Ta Leng',
    shortDesc: 'Đỉnh núi cao thứ 3 Việt Nam (3049m). Vương quốc của hoa đỗ quyên và suối thác trong vắt.',
    tagline: 'Vương quốc Đỗ Quyên',
    story: 'Pu Ta Leng hoang sơ và khắc nghiệt hơn Fansipan. Nơi đây được mệnh danh là thủ phủ của hoa đỗ quyên với những cây cổ thụ hàng trăm năm tuổi nở rực rỡ vào tháng 3-4. Đặc biệt, hành trình đi dọc suối Thầu trong vắt chảy róc rách suốt ngày đêm tạo cảm giác rất thư thái.',
    moods: ['Chinh phục', 'Ngắm hoa', 'Thử thách'],
    difficulty: 4,
    durationDays: 3,
    location: 'Tam Đường, Lai Châu',
    price: 3900000,
    featuredImage: 'https://images.unsplash.com/photo-1558277258-29a368d5503b?q=80&w=2070&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1558277258-29a368d5503b?q=80&w=2070'],
    nextDeparture: '2024-03-15',
    slotsTotal: 18,
    slotsTaken: 12,
    highlights: ['Rừng đỗ quyên cổ thụ', 'Suối Thầu trong vắt', 'Đỉnh 3049m', 'Tắm suối'],
    leaderId: 'l1',
    includes: COMMON_INCLUDES,
    prepares: COMMON_PREPARES,
    policy: COMMON_POLICY,
    itinerary: [
        {day:'Đêm 0',title:'Hà Nội - Sapa',desc:'22:00: Xe đón đi Sapa.'},
        {day:'Ngày 1',title:'Sapa - Hồ Thầu - Lán',desc:'07:00: Di chuyển sang Hồ Thầu (Lai Châu).\n09:30: Bắt đầu trekking. Đi dọc suối lớn, qua nhiều tảng đá to.\n16:30: Tới lán 2400m giữa rừng nguyên sinh.'},
        {day:'Ngày 2',title:'Lán - Đỉnh - Tả Lèng',desc:'05:00: Xuyên rừng đỗ quyên lên đỉnh 3049m.\n09:00: Check-in đỉnh.\n10:00: Xuống núi theo hướng Tả Lèng (đi xuyên tuyến).\n17:00: Hạ trại lán Tả Lèng 2400m.'},
        {day:'Ngày 3',title:'Lán - Sapa - Hà Nội',desc:'07:00: Trekking nhẹ nhàng ra khỏi rừng Tả Lèng.\n12:00: Xe đón về Sapa tắm lá thuốc, ăn mừng chiến thắng.\n23:00: Về Hà Nội.'}
    ],
    checkpoints: [{name:'Đỉnh Pu Ta Leng', altitude:'3049m', feeling:'Tự hào', fatigueLevel:9}],
    summary: { bestMonths: "Tháng 3 - Tháng 4 (Hoa nở)", maxGroupSize: "18 khách", pickupTime: "22:00 PM - Tối thứ 5", meetingPoint: "Hà Nội", durationDesc: "3 ngày 2 đêm", stats: { medicalAccess: {score:4, value:"6h"}, distance:{score:9, value:"35km"}, activityTime:{score:9, value:"10h/ngày"}, elevationGain:{score:9, value:"2500m"}, peakAltitude:{score:10, value:"3049m"} } },
    faq: [{question:"Đi hướng nào đẹp hơn?", answer:"Chúng tôi tổ chức đi xuyên tuyến Hồ Thầu - Tả Lèng để trải nghiệm trọn vẹn cảnh đẹp của cả hai sườn núi."}]
  },
  // 9. PHU SA PHÌN (TÀ XÙA)
  {
    id: 'phu-sa-phin',
    name: 'Phu Sa Phìn (Tà Xùa)',
    shortDesc: 'Lạc vào khu rừng rêu cổ tích ma mị. Chinh phục sống lưng khủng long "thật" và đỉnh cao 2868m.',
    tagline: 'Khu rừng cổ tích',
    story: 'Phu Sa Phìn là tên gọi khác của đỉnh Tà Xùa (Yên Bái) - một trong 15 đỉnh núi cao nhất Việt Nam. Khác với "Tà Xùa thiên đường mây" ở Bắc Yên (Sơn La) xe máy lên được, Tà Xùa Yên Bái là một thử thách thực sự dành cho đôi chân với cánh rừng rêu phong ma mị bậc nhất Tây Bắc, những thân cây cổ thụ hình thù kỳ quái và sống lưng khủng long cheo leo dài hàng cây số thách thức lòng dũng cảm.',
    moods: ['Săn mây', 'Chinh phục', 'Khám phá'],
    difficulty: 3,
    durationDays: 3,
    location: 'Trạm Tấu, Yên Bái',
    price: 3500000,
    featuredImage: 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2070&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2070', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071'],
    nextDeparture: '2024-01-26',
    slotsTotal: 15,
    slotsTaken: 6,
    highlights: ['Rừng rêu ma mị như trong phim cổ tích', 'Săn mây Tà Xùa đỉnh cao', 'Đỉnh cao 2.868m', 'Sống lưng khủng long hùng vĩ nhất Việt Nam'],
    checkpoints: [
        { name: 'Bản Công', altitude: '1400m', feeling: 'Hào hứng bắt đầu', fatigueLevel: 3 },
        { name: 'Rừng Rêu', altitude: '2400m', feeling: 'Lạc vào cổ tích', fatigueLevel: 6 },
        { name: 'Đỉnh Tà Xùa', altitude: '2868m', feeling: 'Chiến thắng bản thân', fatigueLevel: 8 }
    ],
    leaderId: 'l1',
    includes: COMMON_INCLUDES,
    prepares: COMMON_PREPARES,
    policy: COMMON_POLICY,
    itinerary: [
      { day: 'Đêm 0', title: 'Hà Nội - Trạm Tấu', desc: '19:00: Xe đón quý khách tại Hà Nội khởi hành đi Trạm Tấu (Yên Bái).\n00:00: Đến Trạm Tấu, nhận phòng homestay nghỉ ngơi.' },
      { day: 'Ngày 1', title: 'Trạm Tấu - Bản Công - Lán Rừng Rêu', desc: '07:00: Ăn sáng, di chuyển xe ôm vào Bản Công.\n08:30: Bắt đầu trekking. Đường đi dốc gắt liên tục ngay từ đầu.\n12:00: Ăn trưa nghỉ ngơi.\n13:00: Tiếp tục hành trình, bắt đầu đi vào khu rừng rêu cổ thụ ma mị.\n16:00: Hạ trại tại lán nghỉ 2400m. Ăn tối và giao lưu.' },
      { day: 'Ngày 2', title: 'Lán - Sống Lưng Khủng Long - Đỉnh - Lán', desc: '05:00: Dậy sớm, ăn sáng.\n06:00: Xuất phát chinh phục đỉnh. Đi qua sống lưng khủng long dài và hẹp, hai bên là vực sâu.\n09:00: Check-in đỉnh Tà Xùa 2868m.\n12:00: Quay lại lán nghỉ ăn trưa.\nChiều: Nghỉ ngơi hoặc dạo chơi chụp ảnh rừng rêu quanh lán.' },
      { day: 'Ngày 3', title: 'Lán - Bản Công - Trạm Tấu - Hà Nội', desc: '06:00: Ăn sáng, thu dọn đồ đạc xuống núi.\n11:00: Về đến Bản Công. Xe ôm đón ra thị trấn.\n12:30: Ăn trưa tại Trạm Tấu. Thư giãn tắm khoáng nóng tự nhiên.\n16:00: Lên xe khởi hành về Hà Nội.\n21:00: Về đến Hà Nội, kết thúc chương trình.' }
    ],
    summary: { bestMonths: "Tháng 11 - Tháng 4", maxGroupSize: "15 khách", pickupTime: "19:00 PM - Tối thứ 5", meetingPoint: "Hà Nội", durationDesc: "3 ngày 2 đêm", stats: { medicalAccess: { score: 6, value: "4 giờ" }, distance: { score: 5, value: "22km" }, activityTime: { score: 7, value: "7 giờ/ngày" }, elevationGain: { score: 6, value: "1,200m" }, peakAltitude: { score: 7, value: "2,868m" } } },
    faq: [{question: "Sống lưng khủng long có nguy hiểm không?", answer: "Khá hẹp và dốc hai bên, gió mạnh. Tuy nhiên Uptrail có trang bị dây bảo hiểm và Leader hỗ trợ kỹ thuật qua các đoạn khó."}]
  },
  // 10. NGŨ CHỈ SƠN
  {
    id: 'ngu-chi-son',
    name: 'Ngũ Chỉ Sơn',
    shortDesc: 'Bàn tay khổng lồ giữa trời xanh. Cung đường kỹ thuật với nhiều vách đá dựng đứng.',
    tagline: 'Đệ nhất hùng quan',
    story: 'Ngũ Chỉ Sơn gồm 5 ngọn núi như 5 ngón tay hướng lên trời. Đây là cung đường có cảnh quan núi đá hùng vĩ bậc nhất, yêu cầu kỹ thuật leo thang gỗ và bám vách đá. Đứng từ đỉnh có thể nhìn thấy trọn vẹn dãy Hoàng Liên Sơn và đỉnh Fansipan sừng sững.',
    moods: ['Mạo hiểm', 'Thử thách', 'Chinh phục'],
    difficulty: 4,
    durationDays: 2,
    location: 'Tam Đường, Lai Châu',
    price: 3400000,
    featuredImage: 'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?q=80&w=2071&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?q=80&w=2071'],
    nextDeparture: '2023-12-05',
    slotsTotal: 12,
    slotsTaken: 5,
    highlights: ['Vách đá dựng đứng', 'Thang gỗ cheo leo', 'View Fansipan hùng vĩ', 'Thác Cầu Mây'],
    leaderId: 'l2',
    includes: COMMON_INCLUDES,
    prepares: COMMON_PREPARES,
    policy: COMMON_POLICY,
    itinerary: [
        {day:'Đêm 0',title:'Hà Nội - Sapa',desc:'22:00: Xe đón đi Sapa.'},
        {day:'Ngày 1',title:'Sapa - Cổng Trời - Lán',desc:'07:30: Xe đưa đến điểm trek tại Cổng Trời (Ô Quy Hồ).\n09:30: Leo dốc đá liên tục. Đi qua rừng trúc, suối.\n16:00: Tới lán nghỉ dưới chân vách núi.'},
        {day:'Ngày 2',title:'Lán - Đỉnh - Sapa',desc:'05:00: Leo thang gỗ, bám vách đá lên đỉnh ngón cái. Cần cẩn thận tuyệt đối.\n07:00: Check-in.\n12:00: Xuống núi về Sapa.\n23:00: Về HN.'}
    ],
    checkpoints: [{name:'Vách đá', altitude:'2400m', feeling:'Thót tim', fatigueLevel:8}],
    summary: { bestMonths: "Tháng 11 - Tháng 4", maxGroupSize: "12 khách", pickupTime: "22:00 PM - Tối thứ 6", meetingPoint: "Hà Nội", durationDesc: "2 ngày 1 đêm", stats: { medicalAccess: {score:5, value:"5h"}, distance:{score:6, value:"20km"}, activityTime:{score:8, value:"9h/ngày"}, elevationGain:{score:8, value:"2000m"}, peakAltitude:{score:7, value:"2858m"} } },
    faq: [{question:"Sợ độ cao có đi được không?", answer:"Không nên. Cung này có nhiều đoạn vách đá dựng đứng nhìn xuống vực thẳm."}]
  },
  // 11. KHANG SU VĂN
  {
    id: 'khang-su-van',
    name: 'Khang Su Văn',
    shortDesc: 'Chinh phục đỉnh cao biên giới 3012m. Cột mốc 79 thiêng liêng và rừng nguyên sinh rậm rạp.',
    tagline: 'Phên dậu Tổ quốc',
    story: 'Khang Su Văn (Phàn Liên San) là đỉnh núi cao thứ 5 Việt Nam. Hành trình đưa bạn đến cột mốc biên giới 79 thiêng liêng - mốc cao nhất Việt Nam, xuyên qua những khu rừng già phủ rêu đầy bí ẩn và rừng chè cổ thụ hàng trăm năm tuổi.',
    moods: ['Chinh phục', 'Khám phá', 'Thử thách'],
    difficulty: 5,
    durationDays: 3,
    location: 'Phong Thổ, Lai Châu',
    price: 4200000,
    featuredImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974'],
    nextDeparture: '2023-11-10',
    slotsTotal: 15,
    slotsTaken: 8,
    highlights: ['Cột mốc 79 thiêng liêng', 'Rừng chè cổ thụ ngàn năm', 'Hoa Đỗ Quyên vàng', 'Rừng nguyên sinh rậm rạp'],
    leaderId: 'l1',
    includes: COMMON_INCLUDES,
    prepares: COMMON_PREPARES,
    policy: COMMON_POLICY,
    itinerary: [
        {day:'Đêm 0',title:'Hà Nội - Lai Châu',desc:'21:00: Xe đón đi TP Lai Châu.'},
        {day:'Ngày 1',title:'Pa Vây Sử - Lán',desc:'07:00: Xe đưa vào đồn biên phòng Vàng Ma Chải làm thủ tục.\n10:00: Trekking xuyên rừng thảo quả, rừng dẻ.\n17:00: Tới lán 2100m bên suối.'},
        {day:'Ngày 2',title:'Lán - Đỉnh - Mốc 79 - Lán',desc:'05:00: Leo dốc gắt lên đỉnh.\n09:00: Check-in Mốc 79. Nhìn sang biên giới Trung Quốc.\n12:00: Ăn trưa, quay về lán nghỉ.'},
        {day:'Ngày 3',title:'Lán - Pa Vây Sử - Hà Nội',desc:'06:00: Xuống núi.\n13:00: Về Lai Châu ăn trưa, tắm rửa.\n22:00: Xe giường nằm về HN.'}
    ],
    checkpoints: [{name:'Cột mốc 79', altitude:'2800m', feeling:'Thiêng liêng', fatigueLevel:8}],
    summary: { bestMonths: "Tháng 11 - Tháng 4", maxGroupSize: "15 khách", pickupTime: "22:00 PM - Tối thứ 5", meetingPoint: "Hà Nội", durationDesc: "3 ngày 2 đêm", stats: { medicalAccess: {score:3, value:"8h"}, distance:{score:9, value:"30km"}, activityTime:{score:9, value:"10h/ngày"}, elevationGain:{score:9, value:"2200m"}, peakAltitude:{score:9, value:"3012m"} } },
    faq: [{question:"Có cần xin phép biên phòng không?", answer:"Có. Đây là khu vực biên giới nhạy cảm, Uptrail sẽ lo toàn bộ thủ tục giấy phép cho bạn."}]
  },
  // 12. PỜ MA LUNG
  {
    id: 'po-ma-lung',
    name: 'Pờ Ma Lung',
    shortDesc: 'Bức tường thành biên giới. Hành trình chinh phục con dốc Ba Giờ huyền thoại.',
    tagline: 'Bức tường biên giới',
    story: 'Pờ Ma Lung (Bạch Mộc Lương) nổi tiếng với hệ thống suối thác đẹp nhất Tây Bắc và con dốc Ba Giờ thử thách ý chí. Đỉnh cao 2967m nằm sát biên giới Trung Quốc, nơi có bức tường đá tự nhiên dựng đứng như vạn lý trường thành ngăn cách hai nước.',
    moods: ['Thử thách', 'Khám phá', 'Chinh phục'],
    difficulty: 5,
    durationDays: 3,
    location: 'Phong Thổ, Lai Châu',
    price: 4100000,
    featuredImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961'],
    nextDeparture: '2023-12-20',
    slotsTotal: 15,
    slotsTaken: 6,
    highlights: ['Dốc Ba Giờ huyền thoại', 'Thác Rồng hùng vĩ', 'Rừng nguyên sinh rậm rạp', 'Tường thành đá biên giới'],
    leaderId: 'l2',
    includes: COMMON_INCLUDES,
    prepares: COMMON_PREPARES,
    policy: COMMON_POLICY,
    itinerary: [
        {day:'Đêm 0',title:'Hà Nội - Lai Châu',desc:'21:00: Xe đón đi Lai Châu.'},
        {day:'Ngày 1',title:'Bản Lang - Lán',desc:'08:00: Bắt đầu trek từ Bản Lang. Đi qua ruộng bậc thang và hệ thống suối lớn.\n17:00: Cắm trại lán nghỉ bên suối.'},
        {day:'Ngày 2',title:'Lán - Dốc Ba Giờ - Đỉnh',desc:'05:00: Chinh phục dốc Ba Giờ liên tục, rất mất sức.\n10:00: Lên đỉnh 2967m.\n16:00: Quay về lán nghỉ.'},
        {day:'Ngày 3',title:'Lán - Bản Lang - Hà Nội',desc:'06:00: Xuống núi, tắm suối mát lạnh.\n13:00: Về bản, xe đón ra TP Lai Châu.\n22:00: Về HN.'}
    ],
    checkpoints: [{name:'Thác Rồng', altitude:'1200m', feeling:'Mát lạnh', fatigueLevel:3}],
    summary: { bestMonths: "Tháng 10 - Tháng 4", maxGroupSize: "15 khách", pickupTime: "22:00 PM - Tối thứ 5", meetingPoint: "Hà Nội", durationDesc: "3 ngày 2 đêm", stats: { medicalAccess: {score:3, value:"8h"}, distance:{score:10, value:"40km"}, activityTime:{score:10, value:"12h/ngày"}, elevationGain:{score:9, value:"2400m"}, peakAltitude:{score:8, value:"2967m"} } },
    faq: [{question:"Dốc Ba Giờ có thật là leo 3 giờ không?", answer:"Với tốc độ trung bình, bạn sẽ mất khoảng 3-4 tiếng để vượt qua con dốc liên tục này mà không có đoạn bằng."}]
  },
  // 13. NAM KANG HO TAO
  {
    id: 'nam-kang-ho-tao',
    name: 'Nam Kang Ho Tao',
    shortDesc: 'Cung đường hành xác nhất Việt Nam. Chỉ dành cho những đôi chân sắt đá.',
    tagline: 'Cung đường hành xác',
    story: 'Được mệnh danh là "nỗi ám ảnh" của dân trekking với địa hình dốc đá liên tục, suối lớn, vách dựng đứng 3 tầng và rừng trúc dày đặc. Đây là bài test thể lực cực đại cho bất kỳ ai muốn vượt qua giới hạn bản thân. Rừng Pơ Mu cổ thụ ở đây rất đẹp nhưng đường đi cực kỳ gian nan, nguy hiểm.',
    moods: ['Mạo hiểm', 'Thử thách', 'Chinh phục'],
    difficulty: 5,
    durationDays: 4,
    location: 'Văn Bàn, Lào Cai',
    price: 5500000,
    featuredImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1974&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1974'],
    nextDeparture: '2024-02-15',
    slotsTotal: 10,
    slotsTaken: 3,
    highlights: ['Địa hình hiểm trở bậc nhất', 'Rừng Pơ Mu ngàn năm', 'Vượt suối Quyên', 'Vách đá dựng đứng'],
    leaderId: 'l1',
    includes: COMMON_INCLUDES,
    prepares: COMMON_PREPARES,
    policy: COMMON_POLICY,
    itinerary: [
        {day:'Đêm 0',title:'Hà Nội - Lai Châu',desc:'21:00: Xe đi Lai Châu.'},
        {day:'Ngày 1',title:'Thào A - Lán 1',desc:'08:00: Trek từ bản Thào A. Vượt qua nhiều con suối lớn, đá trơn trượt.\n16:00: Cắm trại lán 1.'},
        {day:'Ngày 2',title:'Lán 1 - Lán 2',desc:'06:00: Đi qua rừng trúc rậm rạp, vách đá dựng đứng 3 tầng. Địa hình lên xuống liên tục rất mất sức.\n17:00: Tới lán 2.'},
        {day:'Ngày 3',title:'Lán 2 - Đỉnh - Lán 1',desc:'04:00: Công phá đỉnh 2881m.\n10:00: Quay đầu xuống núi về thẳng Lán 1 (Ngày đi rất dài).'},
        {day:'Ngày 4',title:'Lán 1 - Hà Nội',desc:'06:00: Ra khỏi rừng.\n14:00: Về tới bản. Xe đón về Hà Nội.'}
    ],
    checkpoints: [{name:'Lán Đá', altitude:'2300m', feeling:'Kiệt sức', fatigueLevel:10}],
    summary: { bestMonths: "Tháng 2 - Tháng 4 (Tránh mùa mưa lũ)", maxGroupSize: "10 khách", pickupTime: "22:00 PM - Tối thứ 5", meetingPoint: "Hà Nội", durationDesc: "4 ngày 3 đêm", stats: { medicalAccess: {score:1, value:"12h"}, distance:{score:10, value:"50km"}, activityTime:{score:10, value:"14h/ngày"}, elevationGain:{score:10, value:"3000m"}, peakAltitude:{score:8, value:"2881m"} } },
    faq: [{question:"Tại sao gọi là hành xác?", answer:"Vì đường rất dài, suối trơn, vách đá dựng đứng và dốc lên xuống liên tục không ngừng nghỉ."}]
  },
  // 14. CHUNG NHÍA VŨ
  {
    id: 'chung-nhia-vu',
    name: 'Chung Nhía Vũ',
    shortDesc: 'Cung đường bình yên bên dòng suối, rừng trúc xanh mát và ít người biết đến.',
    tagline: 'Bình yên biên viễn',
    story: 'Chung Nhía Vũ là ngọn núi mới được khai thác, đường đi không quá dốc nhưng cảnh quan rất đa dạng: rừng trúc xanh mướt, rừng lá kim và suối chảy róc rách suốt hành trình. Đây là nơi lý tưởng để "trốn" khỏi những cung đường đông đúc, tìm về sự tĩnh lặng tuyệt đối.',
    moods: ['Thong dong', 'Chữa lành', 'Khám phá'],
    difficulty: 2,
    durationDays: 2,
    location: 'Phong Thổ, Lai Châu',
    price: 3200000,
    featuredImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071'],
    nextDeparture: '2023-11-25',
    slotsTotal: 15,
    slotsTaken: 4,
    highlights: ['Rừng trúc xanh mướt', 'Suối trong vắt', 'Cột mốc 83-84', 'Không gian yên tĩnh'],
    leaderId: 'l3',
    includes: COMMON_INCLUDES,
    prepares: COMMON_PREPARES,
    policy: COMMON_POLICY,
    itinerary: [
        {day:'Đêm 0',title:'Hà Nội - Lai Châu',desc:'21:00: Xe đón đi Lai Châu.'},
        {day:'Ngày 1',title:'Nậm Xe - Lán',desc:'08:00: Trekking dọc suối, qua rừng trúc. Cảnh quan rất thơ mộng, đường đi êm ái.\n16:00: Tới lán nghỉ.'},
        {day:'Ngày 2',title:'Lán - Đỉnh - Hà Nội',desc:'05:30: Lên đỉnh 2918m check-in mốc giới 83-84.\n11:00: Xuống núi.\n16:00: Tắm khoáng nóng Lai Châu, về Hà Nội.'}
    ],
    checkpoints: [{name:'Rừng trúc', altitude:'1800m', feeling:'Thư thái', fatigueLevel:3}],
    summary: { bestMonths: "Tháng 9 - Tháng 4", maxGroupSize: "15 khách", pickupTime: "22:00 PM - Tối thứ 6", meetingPoint: "Hà Nội", durationDesc: "2 ngày 2 đêm", stats: { medicalAccess: {score:7, value:"3h"}, distance:{score:5, value:"16km"}, activityTime:{score:5, value:"6h/ngày"}, elevationGain:{score:5, value:"1000m"}, peakAltitude:{score:8, value:"2918m"} } },
    faq: [{question:"Cung này có sóng điện thoại không?", answer:"Hầu như không có sóng trong suốt hành trình, là nơi cai nghiện internet tuyệt vời."}]
  },
  // 15. PUSILUNG
  {
    id: 'pusilung',
    name: 'Pusilung',
    shortDesc: 'Đỉnh núi cao thứ 2 Việt Nam (3083m). Hành trình dài nhất biên giới với cột mốc 42.',
    tagline: 'Huyền thoại biên cương',
    story: 'Pusilung (Pa Vệ Sủ) là cung trekking dài nhất (hơn 60km khứ hồi). Bạn sẽ đi xuyên qua những cánh rừng già nguyên sinh chưa từng có dấu chân người để chạm tay vào cột mốc 42 thiêng liêng - nơi con gà gáy cả hai nước cùng nghe. Đây là hành trình kiểm chứng sức bền và lòng kiên nhẫn.',
    moods: ['Thử thách', 'Chinh phục', 'Mạo hiểm'],
    difficulty: 5,
    durationDays: 4,
    location: 'Mường Tè, Lai Châu',
    price: 4800000,
    featuredImage: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?q=80&w=2070&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1544198365-f5d60b6d8190?q=80&w=2070'],
    nextDeparture: '2024-01-10',
    slotsTotal: 12,
    slotsTaken: 5,
    highlights: ['Cột mốc 42', 'Rừng nguyên sinh rậm rạp', 'Hành trình 60km', 'Suối trong rừng'],
    leaderId: 'l2',
    includes: COMMON_INCLUDES,
    prepares: COMMON_PREPARES,
    policy: COMMON_POLICY,
    itinerary: [
        {day:'Đêm 0',title:'Hà Nội - Lai Châu',desc:'18:00: Xe đi Lai Châu.'},
        {day:'Ngày 1',title:'Lai Châu - Pa Vệ Sủ - Lán',desc:'07:00: Di chuyển xe 16 chỗ vào đồn biên phòng Pa Vệ Sủ (đường xa).\n12:00: Bắt đầu trek.\n17:00: Ngủ lán ông bà già.'},
        {day:'Ngày 2',title:'Lán - Cột Mốc 42',desc:'05:00: Ngày dài nhất. Đi xuyên rừng già tới cột mốc 42. Check-in biên giới.\n18:00: Quay về lán ngủ.'},
        {day:'Ngày 3',title:'Lán - Đỉnh 3083m - Lán',desc:'06:00: Chinh phục đỉnh Pusilung 3083m.\nChiều: Quay về lán nghỉ ngơi, tiệc nướng.'},
        {day:'Ngày 4',title:'Lán - Hà Nội',desc:'06:00: Xuống núi.\n14:00: Về tới đồn biên phòng.\n23:00: Về Hà Nội.'}
    ],
    checkpoints: [{name:'Cột mốc 42', altitude:'2800m', feeling:'Xúc động', fatigueLevel:9}],
    summary: { bestMonths: "Tháng 11 - Tháng 4", maxGroupSize: "12 khách", pickupTime: "18:00 PM - Tối thứ 5", meetingPoint: "Hà Nội", durationDesc: "4 ngày 3 đêm", stats: { medicalAccess: {score:2, value:"10h"}, distance:{score:10, value:"60km"}, activityTime:{score:10, value:"12h/ngày"}, elevationGain:{score:9, value:"2800m"}, peakAltitude:{score:10, value:"3083m"} } },
    faq: [{question:"Tại sao phải đi 4 ngày?", answer:"Vì quãng đường rất dài và xa xôi (hơn 400km từ HN), đi 3 ngày sẽ phải đi đêm rất nguy hiểm và không đảm bảo sức khỏe."}]
  },
  // 16. ĐỈNH SA MU
  {
    id: 'sa-mu',
    name: 'Đỉnh Sa Mu',
    shortDesc: 'Thiên đường rêu phong và rừng lá phong đỏ rực. Cung đường chữa lành nhẹ nhàng.',
    tagline: 'Miền cổ tích',
    story: 'Đỉnh Sa Mu (hay U Bò) nằm tại Bắc Yên, Sơn La. Đây là thiên đường cho những ai yêu thích vẻ đẹp ma mị của thảm thực vật nguyên sinh. Rừng ở đây phủ kín rêu xanh từ gốc đến ngọn, xen lẫn những cây lá phong đổi màu đỏ rực vào mùa thu đông (tháng 11-12). Cung đường này khá nhẹ nhàng, phù hợp cho những người mới bắt đầu muốn tìm kiếm sự bình yên.',
    moods: ['Chữa lành','Thong dong','Săn mây'],
    difficulty: 3,
    durationDays: 2,
    location: 'Bắc Yên, Sơn La',
    price: 3200000,
    featuredImage: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074'],
    nextDeparture: '2023-12-02',
    slotsTotal: 15,
    slotsTaken: 6,
    highlights: ['Rừng rêu nguyên sinh dày đặc','Rừng lá phong đỏ (T11-12)','Săn mây Bắc Yên','Check-in cây táo mèo cô đơn'],
    leaderId: 'l3',
    includes: COMMON_INCLUDES,
    prepares: COMMON_PREPARES,
    policy: COMMON_POLICY,
    itinerary: [
        {day:'Ngày 0',title:'Hà Nội - Bắc Yên',desc:'19:30: Xe đón tại Hà Nội đi Bắc Yên (Sơn La).\n00:30: Đến Bắc Yên, nghỉ ngơi tại Homestay Xím Vàng.'},
        {day:'Ngày 1',title:'Xím Vàng - Lán Nghỉ',desc:'07:30: Ăn sáng, chuẩn bị đồ đạc.\n08:30: Bắt đầu trekking. Đường đi xuyên qua rừng nguyên sinh rợp bóng mát, thảm rêu xanh rì.\n12:00: Ăn trưa picnic trong rừng.\n15:30: Tới lán nghỉ giữa rừng. Tự do chụp ảnh hoàng hôn.\n18:00: Tiệc nướng BBQ giữa rừng già.'},
        {day:'Ngày 2',title:'Đỉnh Sa Mu - Hà Nội',desc:'05:30: Trek nhẹ nhàng lên đỉnh 2756m. Từ đây có thể nhìn thấy biển mây Tà Xùa phía xa.\n08:30: Quay xuống núi theo đường cũ.\n12:00: Ăn trưa tại Xím Vàng.\n14:00: Lên xe về Hà Nội.\n19:00: Có mặt tại Hà Nội.'}
    ],
    checkpoints: [{name:'Rừng Ma', altitude:'2200m', feeling:'Ma mị', fatigueLevel:5}],
    summary: { bestMonths: "Tháng 12 - Tháng 3", maxGroupSize: "15 khách", pickupTime: "19:30 PM - Tối thứ 6", meetingPoint: "Hà Nội", durationDesc: "2 ngày 1 đêm", stats: { medicalAccess: {score:6, value:"4 giờ"}, distance:{score:5, value:"15km"}, activityTime:{score:6, value:"6 giờ/ngày"}, elevationGain:{score:5, value:"1,100m"}, peakAltitude:{score:6, value:"2,756m"} } },
    faq: [{question:"Mùa nào có lá phong?", answer:"Tháng 9 đến tháng 11 dương lịch là mùa lá phong chuyển màu đỏ đẹp nhất."}]
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'a1',
    title: '5 điều cần chuẩn bị cho chuyến trekking đầu tiên',
    slug: '5-dieu-can-chuan-bi-trekking',
    excerpt: 'Trekking không khó như bạn nghĩ, chỉ cần chuẩn bị kỹ càng một chút thôi. Dưới đây là 5 vật dụng "bất ly thân" mà mọi trekker mới đều cần biết.',
    content: '<p>Trekking là một hoạt động thú vị nhưng cũng đầy thử thách...</p>',
    coverImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
    authorId: 'l2',
    categoryId: 'guide',
    tags: ['tips', 'beginner'],
    createdAt: '2023-10-20'
  },
  {
    id: 'a2',
    title: 'Chuyện về những người gùi hàng trên đỉnh núi',
    slug: 'porter-chuyen-chua-ke',
    excerpt: 'Họ là những người hùng thầm lặng, gùi trên lưng cả thế giới tiện nghi cho chúng ta. Hãy cùng lắng nghe câu chuyện của những Porter người Mông.',
    content: '<p>Nếu bạn đã từng leo núi ở Tây Bắc, chắc chắn bạn đã gặp những người Porter...</p>',
    coverImage: 'https://images.unsplash.com/photo-1629248456652-3269b8214375?q=80&w=1974&auto=format&fit=crop',
    authorId: 'l1',
    categoryId: 'story',
    tags: ['people', 'culture'],
    createdAt: '2023-10-21'
  },
  {
    id: 'a3',
    title: 'Giày Trekking: Chọn sao cho đúng?',
    slug: 'chon-giay-trekking',
    excerpt: 'Đôi giày là người bạn đồng hành quan trọng nhất. Chọn sai giày có thể biến chuyến đi của bạn thành thảm họa. Tìm hiểu về độ bám, chống nước và size giày.',
    content: '<p>Giày trekking khác giày chạy bộ ở chỗ...</p>',
    coverImage: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2071&auto=format&fit=crop',
    authorId: 'l2',
    categoryId: 'guide',
    tags: ['gear', 'tips'],
    createdAt: '2023-11-05'
  }
];

export const USERS: User[] = [
    {
        id: 'u1',
        username: 'admin',
        password: '123',
        role: 'admin',
        name: 'Admin Uptrail',
        avatar: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff',
        active: true
    },
    {
        id: 'u2',
        username: 'editor',
        password: '123',
        role: 'editor',
        name: 'Content Editor',
        avatar: 'https://ui-avatars.com/api/?name=Editor&background=random',
        active: true
    }
];

export const TESTIMONIALS: Testimonial[] = [
    {
        id: 't1',
        name: 'Minh Hằng',
        tourName: 'Lảo Thẩn',
        comment: 'Lần đầu đi trekking mà gặp được team Uptrail quá dễ thương. Leader Hạnh chăm sóc từng chút một, đồ ăn siêu ngon.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop'
    },
    {
        id: 't2',
        name: 'Quang Dũng',
        tourName: 'Kỳ Quan San',
        comment: 'Cung đường đẹp nhưng khá mệt. May mà có các bạn porter hỗ trợ nhiệt tình. Món lẩu gà trên núi đỉnh cao!',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'
    },
    {
        id: 't3',
        name: 'Thu Thảo',
        tourName: 'Tà Chì Nhù',
        comment: 'Biển mây Tà Chì Nhù không làm mình thất vọng. Cảm ơn Uptrail đã tổ chức chuyến đi rất chuyên nghiệp.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop'
    },
    {
        id: 't4',
        name: 'Đức Mạnh',
        tourName: 'Nhìu Cồ San',
        comment: 'Rừng đỗ quyên nở rực rỡ, thác Ong Chúa hùng vĩ. Một trải nghiệm không thể quên.',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop'
    },
    {
        id: 't5',
        name: 'Hải Yến',
        tourName: 'Tả Liên Sơn',
        comment: 'Khu rừng cổ tích thực sự. Mình thích cách Uptrail bảo vệ môi trường, không để lại rác.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'
    }
];

export const SITE_CONFIG: SiteConfig = {
    heroTitle: "Chạm vào thiên nhiên, Tìm lại chính mình",
    heroSubtitle: "Hành trình trekking chữa lành tâm hồn giữa đại ngàn Tây Bắc",
    heroVideoUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
    heroImages: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop"
    ],
    heroSlideDuration: 5,
    heroOverlayOpacity: 0.4,
    
    introTitle: "Không chỉ là leo núi, đó là hành trình trở về",
    introContent: "Uptrail tin rằng, giữa bộn bề cuộc sống, thiên nhiên là liều thuốc chữa lành tốt nhất. Mỗi bước chân chạm vào đất mẹ, mỗi hơi thở giữa rừng già sẽ giúp bạn gột rửa những ưu phiền. Chúng tôi không chỉ dẫn đường, chúng tôi cùng bạn trải nghiệm, lắng nghe và thấu hiểu.",

    moodTitle: "Cảm xúc của bạn hôm nay?",
    moodSubtitle: "Hãy để thiên nhiên vỗ về tâm hồn bạn theo cách riêng",

    tourTitle: "Những cung đường huyền thoại",
    tourSubtitle: "Tuyển chọn những hành trình đẹp nhất Tây Bắc",

    leaderTitle: "Người bạn đồng hành tin cậy",
    leaderSubtitle: "Đội ngũ Leader & Porter bản địa giàu kinh nghiệm, nhiệt thành",
    leaderDesc: "Họ là những người con của núi rừng, am hiểu từng ngọn cây, hốc đá. Không chỉ đảm bảo an toàn tuyệt đối, họ còn là những người kể chuyện duyên dáng, mang đến cho bạn những trải nghiệm văn hóa bản địa chân thực nhất.",
    leaderQuote: "Chúng tôi không chỉ dẫn đường, chúng tôi mang đến sự an tâm.",

    sustainabilityTitle: "Rừng cho ta bóng mát, mình trả lại sự nguyên sơ.",
    sustainabilityContent: "<p>Uptrail hiểu rằng, chúng ta chỉ là những vị khách ghé thăm ngôi nhà chung của Mẹ Thiên Nhiên. Vì vậy, sự bền vững tại Uptrail không phải là những báo cáo số liệu, mà là những hành động nhỏ nhặt, lặp đi lặp lại mỗi ngày trên đường tour:</p><br/><p><strong>1. Chuyến đi \"Không dấu vết\" (Leave No Trace)</strong><br />Quy tắc của Uptrail rất đơn giản: Những gì bạn mang lên núi, hãy mang nó xuống núi.<br />Hơn thế nữa, mỗi Guide của Uptrail đều là một \"người dọn dẹp\" tự nguyện. Chúng mình thường mang theo những chiếc túi rỗng để nhặt rác trên đường đi, gom lại những gì người trước vô tình bỏ quên. Chúng mình hy vọng, bạn sẽ cùng chung tay làm điều đó.</p><br/><p><strong>2. Đồng hành cùng cộng đồng bản địa</strong><br />Chúng mình không đến để khai thác, chúng mình đến để hợp tác. Uptrail ưu tiên sử dụng nhân sự địa phương (Porter, xe ôm, homestay) với mức chi trả xứng đáng và tôn trọng nhất.<br />Chúng mình tin rằng, khi người dân bản địa có thu nhập ổn định từ việc giữ rừng và làm du lịch, họ sẽ là những người bảo vệ thiên nhiên tốt nhất.</p><br/><p><strong>3. Tôn trọng văn hóa bản sắc</strong><br />Mỗi bản làng đi qua đều có những phong tục riêng. Uptrail sẽ kể cho bạn nghe những điều kiêng kỵ, những nét đẹp văn hóa để chúng ta đi qua như những người bạn hiểu chuyện, chứ không phải những kẻ ồn ào xâm phạm sự bình yên vốn có.</p>",

    testimonialTitle: "Câu chuyện từ những vị khách",
    testimonialSubtitle: "Hạnh phúc của bạn là động lực của chúng tôi",
    
    newsTitle: "Góc chia sẻ",
    newsSubtitle: "Kinh nghiệm, kỹ năng và những câu chuyện đường rừng",

    contactTitle: "Liên hệ với Uptrail",
    contactSubtitle: "Chúng tôi luôn sẵn sàng lắng nghe bạn",
    hotline: "0966 666 666",
    email: "hi@uptrail.vn",
    address: "Số 1, Ngõ 1, Phố Núi Trúc, Hà Nội",
    
    backgroundMusicUrl: "",

    // SEO Global
    globalSeoTitle: "UPTRAIL - Hành Trình Chữa Lành",
    globalSeoDesc: "Uptrail chuyên tổ chức các tour trekking, leo núi trọn gói, chuyên nghiệp. Khám phá vẻ đẹp Việt Nam qua những hành trình kết nối thiên nhiên.",
    globalSeoImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",

    // ABOUT PAGE
    aboutHeroTitle: "Uptrail sinh ra từ những ngày thành phố 'khó thở'",
    aboutHeroDesc1: "Chúng mình bắt đầu Uptrail không phải vì muốn làm một công ty du lịch lớn, mà vì chính chúng mình cũng từng là những người trẻ khao khát chạy trốn khỏi tiếng còi xe, khói bụi và những thông báo tin nhắn không hồi kết.",
    aboutHeroDesc2: "Chúng mình nhận ra rằng, liều thuốc tốt nhất cho những mệt mỏi phố thị không nằm trong vỉ thuốc, mà nằm ở mùi đất sau mưa, tiếng gió rít qua tai và cảm giác đôi chân mỏi nhừ khi chạm đến đỉnh núi.",
    aboutHeroQuote: "Uptrail tồn tại để làm cầu nối đưa bạn về lại với những điều nguyên bản ấy.",
    aboutHeroImage: "https://images.unsplash.com/photo-1519904981063-b0cf448d4791?q=80&w=2070&auto=format&fit=crop",

    aboutBeliefTitle: "Niềm tin",
    aboutBelief1Title: "Sức mạnh của sự im lặng",
    aboutBelief1Desc: "Giữa núi rừng, khi sóng điện thoại tắt đi, là lúc sự kết nối thật sự bắt đầu: Kết nối với thiên nhiên, với bạn đồng hành, và quan trọng nhất – kết nối lại với chính mình.",
    aboutBelief2Title: "Trải nghiệm hơn Check-in",
    aboutBelief2Desc: "Chúng mình tin rằng du lịch không phải là check-in. Một bức ảnh đẹp là phần thưởng, nhưng trải nghiệm thật sự nằm ở những giọt mồ hôi, bát mì tôm nóng hổi giữa rừng lạnh giá.",
    aboutBelief3Title: "Sự tử tế",
    aboutBelief3Desc: "Chúng mình tin vào sự tử tế. Tử tế với khách hàng, tử tế với người bản địa, và tử tế với từng ngọn cỏ chúng ta đi qua.",

    aboutVisionTitle: "Không phải số 1, mà là duy nhất.",
    aboutVisionDesc1: "Uptrail không đặt mục tiêu trở thành công ty tổ chức tour lớn nhất hay đông khách nhất.",
    aboutVisionDesc2: "Chúng mình hướng đến việc xây dựng một cộng đồng những người yêu rừng văn minh. Nơi mà mỗi chuyến đi là hành trình lan tỏa văn hóa du lịch có trách nhiệm (Responsible Tourism).",
    aboutVisionQuote: "10 năm nữa, núi vẫn xanh.",

    aboutMissionTitle: "Sứ mệnh",
    aboutMissionSubtitle: "Cam kết của chúng tôi với từng hành trình",
    aboutMission1Title: "Với người tham gia",
    aboutMission1Desc: "Uptrail thiết kế hành trình dựa trên thể lực, trải nghiệm phù hợp với đa số mọi người. Để ai cũng có thể có những chuyến đi an toàn, trọn vẹn.",
    aboutMission2Title: "Với thiên nhiên",
    aboutMission2Desc: "Uptrail bước vào núi rừng với sự tôn trọng. Đủ chậm để không làm xáo trộn, đủ nhẹ để không để lại dấu vết, và đủ ý thức để thiên nhiên được nguyên vẹn sau mỗi hành trình.",
    aboutMission3Title: "Với cộng đồng",
    aboutMission3Desc: "Chúng tôi tôn trọng văn hóa, lối sống và nhịp sinh hoạt của người địa phương. UPTRAIL đến như những người khách, không phải người khai thác.",

    aboutValueTitle: "Giá trị cốt lõi",
    aboutValueSubtitle: "Điều giữ Uptrail khác biệt",
    aboutValue1Title: "01. Kỷ luật thầm lặng",
    aboutValue1Desc: "Chúng mình có thể là những gã mơ mộng trước cái đẹp, nhưng là những người thực tế đến khắc nghiệt về an toàn. Uptrail chuẩn bị cho chuyến đi của bạn từ... tuần trước: Kiểm tra thời tiết, khảo sát cung đường. Kỷ luật của chúng tôi là sự tự do của bạn.",
    aboutValue2Title: "02. Bạn đường bình đẳng",
    aboutValue2Desc: "Ở Uptrail không có khoảng cách giữa 'Người phục vụ' và 'Thượng đế'. Chúng ta là đồng đội. Guide của Uptrail sẽ là người bạn địa phương, chia sẻ gánh nặng, lắng nghe câu chuyện và cùng bạn ăn, cùng bạn đi.",
    aboutValue3Title: "03. Trải nghiệm thật",
    aboutValue3Desc: "Không tô vẽ, không dàn dựng. Món ăn bạn ăn là hương vị bản địa, con đường bạn đi là lối mòn của người đi rừng, và vẻ đẹp bạn thấy là sự hùng vĩ trần trụi của thiên nhiên.",

    aboutPeopleTitle: "Con người Uptrail",
    aboutPeopleSubtitle: "Những mảnh ghép yêu rừng",
    aboutPeopleLeaderDesc: "Là những Travel Leader mang trên vai trách nhiệm của cả đoàn, am hiểu từng cung đường, từng điểm rẽ, luôn chuẩn bị kỹ lưỡng cho những điều bất ngờ, vì sự an toàn của mọi người luôn được đặt lên trước hết.",
    aboutPeoplePorterDesc: "Những người con của núi rừng với nụ cười hiền khô, cõng trên lưng cả ngôi nhà của chúng ta mà bước chân vẫn thoăn thoắt.",
    aboutPeopleOpsDesc: "Những người có thể ngồi văn phòng trả lời tin nhắn của bạn, nhưng trái tim thì đã treo ngược trên cành cây từ lâu rồi.",
    aboutPeopleQuote: "Chúng mình gặp nhau ở một điểm chung duy nhất: Yêu rừng hơn yêu phố.",

    aboutEndingTitle: "Cảm ơn bạn đã đọc đến tận đây.",
    aboutEndingDesc1: "Có thể hôm nay bạn chưa sẵn sàng, hoặc công việc vẫn còn đang dang dở. Không sao cả. Thiên nhiên vẫn luôn kiên nhẫn và bao dung.",
    aboutEndingDesc2: "Bất cứ khi nào bạn thấy mỏi gối chùn chân trước áp lực cuộc sống, hay đơn giản là thèm một bầu không khí khác, hãy nhớ rằng luôn có một chỗ trống bên bếp lửa của Uptrail dành cho bạn.",
    aboutEndingSignature: "Hẹn gặp nhau, ở nơi mây ngàn gió núi.",

    // CONTACT PAGE
    contactMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.385567439603!2d105.8087!3d21.0172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAxJzAyLjAiTiAxMDXCsDQ4JzMxLjMiRQ!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s",
    contactHotlineDesc: "Hỗ trợ 24/7 cho các trường hợp khẩn cấp trên tour.",
    contactEmailDesc: "Dành cho hợp tác và các yêu cầu tour riêng."
};
