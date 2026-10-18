import { StoryEvent, RandomPopupEvent } from '../types/game';

// 1. SỰ KIỆN CỐ ĐỊNH (Fixed Schedule Events)
export const FIXED_SCHEDULE_EVENTS: Record<string, StoryEvent> = {
  // Sáng Ngày 1
  'd1_fixed_morning': {
    id: 'd1_fixed_morning',
    day: 1,
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'Lịch trình cố định',
    topic: 'arrival_day1',
    title: 'Xuất phát từ ĐH Nhân Văn đến Hola & Nhận quân trang D2',
    narrative: 'Đoàn xe lăn bánh từ ĐH Khoa học Xã hội & Nhân văn đưa các tân binh cập bến Hòa Lạc. Mọi người nhanh chóng xếp hàng vào nhà D2 nhận quân trang gồm: 2 bộ quân phục, sách giáo trình, 1 ghế, và 1 mũ cối có dán nhãn tên cá nhân, nộp tiền ăn sinh hoạt và tìm phòng tập thể.',
    speaker: {
      name: 'Đại đội trưởng D2',
      role: 'Cán bộ chỉ huy',
      avatarId: 'commander',
      mood: 'stern',
    },
    dialogue: 'Chào mừng các đồng chí sinh viên ĐHQGHN đến với Trung tâm GDQP&AN! Nhận quân trang xong khẩn trương về phòng D2 ổn định tổ chức!',
    backgroundType: 'courtyard',
    isMilestone: true,
    isFixedSchedule: true,
    fixedDay: 1,
    fixedPhase: 'morning',
    fixedTimeText: '08:00 - Sáng Ngày 1',
    choices: [
      {
        id: 'd1_f1_c1',
        text: 'Nhanh nhẹn kiểm đếm đủ quân trang, nộp tiền ăn đầy đủ và phụ bạn xách ghế lên phòng',
        attributeEffects: { health: -2, morale: 5, reputation: 8, money: -50000 },
        tipRewardId: 'tip_thong_nhat_quy_uoc_phong',
        inventoryRewardId: 'binh_nuoc',
        outcomeText: 'Tác phong nhanh nhẹn và nhiệt tình giúp bạn tạo ấn tượng mẫu mực ngay từ giờ đầu tiên tại D2!',
      },
      {
        id: 'd1_f1_c2',
        text: 'Nhận đồ xong chụp vội tấm ảnh check-in cổng D2 rồi cùng Minh về phòng chọn giường',
        attributeEffects: { health: 0, morale: 6, reputation: 4, money: -50000 },
        outcomeText: 'Bức ảnh check-in nhập ngũ Hòa Lạc nhận được bão like từ bạn bè ở nhà. Tinh thần phấn chấn!',
      },
      {
        id: 'd1_f1_c3',
        text: 'Kiểm tra kỹ lưỡng tem dán tên trên mũ cối và xếp ngay ngắn quân trang vào balo trước khi lên tầng',
        attributeEffects: { health: 1, morale: 5, reputation: 6, money: -50000 },
        tipRewardId: 'tip_tranh_phat_tien_quan_trang',
        outcomeText: 'Sự cẩn trọng kiểm tra nhãn tên trên mũ cối giúp bạn hoàn toàn an tâm không lo bị lẫn đồ.',
      },
    ],
  },

  // Trưa Ngày 1: Chọn Giường Tầng (Cố định Ngày 1 duy nhất)
  'd1_fixed_bed_choice': {
    id: 'd1_fixed_bed_choice',
    day: 1,
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'Nề nếp & Phòng ở',
    topic: 'dorm_bed',
    title: 'Phân chia giường ngủ phòng 14 người (7 giường tầng)',
    narrative: 'Vừa nhận phòng 14 người cùng các bạn đồng giới, bạn và một bạn nữa cùng nhắm chiếc giường tầng 2 ở vị trí trung tâm thoáng mát gần quạt.',
    speaker: {
      name: 'Bạn cùng phòng',
      role: 'Đồng đội phòng 14 người',
      avatarId: 'roommate',
      mood: 'worried',
    },
    dialogue: 'Cậu ơi, chiếc giường tầng 2 này đón trọn gió quạt trần mát quá, mình cũng đang tính chọn giường này...',
    backgroundType: 'dorm',
    isMilestone: true,
    isFixedSchedule: true,
    fixedDay: 1,
    fixedPhase: 'morning',
    fixedTimeText: '10:30 - Trưa Ngày 1',
    choices: [
      {
        id: 'd1_bed_c1',
        text: 'Chủ động nói chuyện chia sẻ, nhường bạn tầng 2 còn mình nhận tầng 1 để tiện đi lại và lấy đồ dưới gầm giường',
        attributeEffects: { reputation: 6, morale: 4 },
        tipRewardId: 'tip_chia_se_giuong_tang',
        outcomeText: 'Sự nhường nhịn và thấu hiểu giúp bạn tạo ấn tượng ấm áp ngay từ ngày đầu, giường tầng 1 hóa ra rất tiện khi lấy ba lô dưới gầm.',
      },
      {
        id: 'd1_bed_c2',
        text: 'Nhanh tay quăng ba lô lên chiếm bằng được chiếc giường tầng 2 trung tâm',
        attributeEffects: { reputation: -6, morale: 2 },
        outcomeText: 'Bạn chiếm được giường tầng 2 ưng ý nhưng khiến bạn cùng phòng hụt hẫng và không khí phòng có chút gượng gạo.',
      },
      {
        id: 'd1_bed_c3',
        text: 'Đề xuất cả phòng bốc thăm vị trí giường ngẫu nhiên cho công bằng, vui vẻ',
        attributeEffects: { reputation: 8, morale: 5 },
        tipRewardId: 'tip_thong_nhat_quy_uoc_phong',
        outcomeText: 'Sáng kiến bốc thăm dân chủ được cả phòng 14 người tán thành nhiệt liệt trong tiếng cười rôm rả!',
      },
    ],
  },

  // Sáng Ngày 2
  'd2_fixed_morning': {
    id: 'd2_fixed_morning',
    day: 2,
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'Lịch trình cố định',
    topic: 'ceremony',
    title: 'Lễ Khai mạc khóa học GDQP&AN tại Sân chào cờ',
    narrative: 'Sáng sớm trong lành mát mẻ đón ánh bình minh mùa hè, toàn thể khóa học tập hợp trang nghiêm tại sân vận động trung tâm. Tiếng Quốc ca vang lên hùng tráng dưới bầu trời Hòa Lạc. Đại diện Trung tâm đọc quyết định khai mạc và quán triệt quy chế kỷ luật thép.',
    speaker: {
      name: 'Đại tá Giám đốc TT',
      role: 'Chỉ huy trưởng',
      avatarId: 'commander',
      mood: 'normal',
    },
    dialogue: 'Rèn luyện kỷ luật là rèn luyện bản lĩnh người trí thức! Chúc các em có một tuần học tập xuất sắc!',
    backgroundType: 'parade',
    isMilestone: true,
    isFixedSchedule: true,
    fixedDay: 2,
    fixedPhase: 'morning',
    fixedTimeText: '07:00 - Sáng Ngày 2',
    choices: [
      {
        id: 'd2_f1_c1',
        text: 'Đứng nghiêm trang từ đầu đến cuối, ghi nhớ 10 điều kỷ luật và điều lệnh chào',
        attributeEffects: { health: -1, morale: 6, reputation: 8, money: 0 },
        tipRewardId: 'tip_ky_luat_gio_giac',
        inventoryRewardId: 'so_tay',
        outcomeText: 'Tác phong trang nghiêm giúp trung đội bạn được cán bộ biểu dương trước toàn khóa!',
      },
      {
        id: 'd2_f1_c2',
        text: 'Hát Quốc ca thật to và dõng dạc hòa cùng hàng nghìn sinh viên',
        attributeEffects: { health: 0, morale: 8, reputation: 6, money: 0 },
        outcomeText: 'Khí thế hào hùng lan tỏa khắp lồng ngực, cảm giác tự hào và thiêng liêng khó tả.',
      },
      {
        id: 'd2_f1_c3',
        text: 'Giữ hàng ngũ chuẩn xác và quan sát vị trí các khu giảng đường, bãi tập để nắm sơ đồ doanh trại',
        attributeEffects: { health: 0, morale: 5, reputation: 7, money: 0 },
        tipRewardId: 'tip_thong_nhat_quy_uoc_phong',
        outcomeText: 'Bạn nắm rõ mọi lối đi và sơ đồ doanh trại, giúp cả phòng luôn di chuyển nhanh chóng, chuẩn giờ.',
      },
    ],
  },

  // Chiều Thứ 6 (Ngày 6, 16:30)
  'd6_fixed_afternoon': {
    id: 'd6_fixed_afternoon',
    day: 6,
    phase: 'afternoon',
    phaseLabel: 'Chiều',
    category: 'Lịch trình cố định',
    topic: 'general_cleaning',
    title: '16:30 Thứ Sáu - Tổng vệ sinh toàn diện doanh trại D2',
    narrative: 'Đúng 16h30 chiều thứ Sáu, toàn đại đội bắt tay vào đợt tổng vệ sinh: quét mạng nhện trần nhà, lau cửa kính, cạo vết bẩn sàn gạch, cọ rửa nhà tắm và sắp xếp giá giày.',
    speaker: {
      name: 'An',
      role: 'Lớp phó kỷ luật',
      avatarId: 'an',
      mood: 'normal',
    },
    dialogue: 'Thầy thông báo tối nay sẽ chấm điểm thi đua tuần! Chúng mình cùng xắn tay áo dọn dẹp thật sạch nhé!',
    backgroundType: 'wash',
    isMilestone: true,
    isFixedSchedule: true,
    fixedDay: 6,
    fixedPhase: 'afternoon',
    fixedTimeText: '16:30 - Chiều Thứ Sáu',
    choices: [
      {
        id: 'd6_f1_c1',
        text: 'Xung phong cọ rửa nhà tắm và lau khô sàn hành lang theo quy chuẩn',
        attributeEffects: { health: -3, morale: 4, reputation: 10, money: 0 },
        tipRewardId: 'tip_giup_do_ban_cung_phong',
        inventoryRewardId: 'khan_lau_da_nang',
        outcomeText: 'Phòng bạn đạt điểm A tuyệt đối trong đợt kiểm tra nội vụ chiều thứ Sáu!',
      },
      {
        id: 'd6_f1_c2',
        text: 'Phân loại đồ trên 3 dây phơi và căn thẳng hàng toàn bộ giá giày dép',
        attributeEffects: { health: -1, morale: 5, reputation: 8, money: 0 },
        tipRewardId: 'tip_phan_loai_3_day_phoi',
        outcomeText: 'Giá dép thẳng tắp như kẻ chỉ khiến ban kiểm tra tấm tắc khen ngợi.',
      },
      {
        id: 'd6_f1_c3',
        text: 'Lau chùi cửa sổ, quét mạng nhện trần nhà và dùng khăn ẩm lau sạch bụi các thanh dát giường',
        attributeEffects: { health: -2, morale: 5, reputation: 9, money: 0 },
        outcomeText: 'Căn phòng sáng bóng không một hạt bụi, được chỉ huy chấm điểm xuất sắc!',
      },
    ],
  },

  // Sáng Thứ Bảy / Chủ Nhật (Ngày 7)
  'd7_fixed_morning': {
    id: 'd7_fixed_morning',
    day: 7,
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'Lịch trình cố định',
    topic: 'family_visit',
    title: 'Sáng cuối tuần - Đón tiếp người thân & bạn bè lên thăm Hola',
    narrative: 'Sáng cuối tuần, khu vực cổng tiếp dân rộn rã tiếng cười nói. Phụ huynh và bạn bè mang theo đồ ăn vặt, trái cây và những lời động viên ấm áp lên tiếp lửa cho các chiến sĩ.',
    speaker: {
      name: 'Minh',
      role: 'Bạn cùng phòng',
      avatarId: 'minh',
      mood: 'smile',
    },
    dialogue: 'Cậu ơi! Bố mẹ tớ mang lên cho cả phòng một thùng hoa quả và sữa này! Ra sảnh đón người nhà thôi!',
    backgroundType: 'courtyard',
    isMilestone: true,
    isFixedSchedule: true,
    fixedDay: 7,
    fixedPhase: 'morning',
    fixedTimeText: '08:30 - Sáng Cuối Tuần',
    choices: [
      {
        id: 'd7_f1_c1',
        text: 'Tiếp đón gia đình chu đáo, mời người thân vào khu vực đăng ký theo đúng quy định',
        attributeEffects: { health: 4, morale: 12, reputation: 8, money: 20000 },
        inventoryRewardId: 'chuoi_tieu',
        outcomeText: 'Bố mẹ tự hào khi thấy bạn chững chạc, đen giòn và tác phong quân ngũ đĩnh đạc.',
      },
      {
        id: 'd7_f1_c2',
        text: 'Cùng cả phòng bày hoa quả liên hoan vui vẻ tại bàn sinh hoạt chung',
        attributeEffects: { health: 6, morale: 10, reputation: 7, money: 0 },
        outcomeText: 'Bữa tiệc nhỏ rộn rã tiếng cười gắn kết tình bạn giữa các gia đình sinh viên.',
      },
      {
        id: 'd7_f1_c3',
        text: 'Dẫn bố mẹ và người thân đi tham quan sân chào cờ, nhà ăn và khoe chiếc chăn gấp vuông vắn',
        attributeEffects: { health: 3, morale: 14, reputation: 8, money: 10000 },
        outcomeText: 'Bố mẹ xúc động và yên tâm khi thấy con mình sống tự lập, kỷ luật và trưởng thành trong quân ngũ.',
      },
    ],
  },
};

// Các hàm sinh sự kiện Tối khung 20:30 (Sinh hoạt đại đội với các tình huống đa dạng)

export function createLateRollcallAngryTeacherSituation(day: number): StoryEvent {
  return {
    id: `d${day}_2030_tap_trung_muon_thay_mang`,
    day,
    phase: 'evening',
    phaseLabel: 'Tối',
    category: 'Lịch trình 20:30',
    topic: 'evening_rollcall_late',
    title: `20:30 - Toàn đại đội tập trung muộn 5 phút, Thầy cáu và mắng gay gắt`,
    narrative: `Đúng 20:30, kẻng tập hợp điểm danh vang lên dồn dập, nhưng do một số phòng mải sấy tóc và chưa phân loại xong đồ phơi, đến 20:35 đại đội mới đứng đủ đội hình dưới sân chào cờ. Thầy đại đội trưởng đứng trước hàng quân với nét mặt đanh thép, tiếng còi chấn chỉnh rền vang trong đêm hè Hòa Lạc.`,
    speaker: {
      name: 'Đại đội trưởng D2',
      role: 'Cán bộ chỉ huy',
      avatarId: 'commander',
      mood: 'stern',
    },
    dialogue: 'Các đồng chí coi kỷ luật quân đội là trò đùa đấy à?! Trễ 5 phút trên chiến trường là hy sinh cả đơn vị! Toàn đại đội đứng nghiêm tại chỗ 15 phút, ai nhúc nhích đứng thêm nửa tiếng!',
    backgroundType: 'parade',
    isFixedSchedule: true,
    fixedTimeText: '20:30 - Sinh hoạt đại đội',
    choices: [
      {
        id: `d${day}_ttm_c1`,
        text: 'Đứng nghiêm bất động như tượng đồng, mắt nhìn thẳng, hít thở đều kiên nhẫn chấp hành kỷ luật',
        attributeEffects: { health: -1, morale: -2, reputation: 8, money: 0 },
        tipRewardId: 'tip_sinh_hoat_dai_doi_nghiem_tuc',
        outcomeText: 'Thấy bạn và các hàng đầu đứng nghiêm túc tuyệt đối không hề nao núng, Thầy nguôi giận, hạ lệnh cho đại đội thôi đứng nghiêm và nhắc nhở rút kinh nghiệm sâu sắc.',
      },
      {
        id: `d${day}_ttm_c2`,
        text: 'Đứng hàng sau lén lút lắc lư chân, xì xào cằn nhằn với bạn bên cạnh vì mỏi chân',
        attributeEffects: { health: -3, morale: -8, reputation: -10, money: 0 },
        outcomeText: 'Tiếng xì xào bị cán bộ đi tuần phát hiện! Cả trung đội của bạn bị phạt chống đẩy 20 cái ngay tại sân chào cờ trong đêm hè!',
      },
      {
        id: `d${day}_ttm_c3`,
        text: 'Giữ thế đứng nghiêm, dùng ánh mắt và nhắc khẽ đồng đội xung quanh tập trung không làm Thầy giận thêm',
        attributeEffects: { health: 0, morale: 0, reputation: 7, money: 0 },
        outcomeText: 'Hàng ngũ nhanh chóng im phăng phắc. Sự tự giác của đại đội giúp buổi sinh hoạt chuyển hướng êm đẹp sang dặn dò lịch thao trường sáng mai.',
      },
    ],
  };
}

export function createGroomingInspection2030Situation(day: number): StoryEvent {
  return {
    id: `d${day}_2030_kiem_tra_tac_phong`,
    day,
    phase: 'evening',
    phaseLabel: 'Tối',
    category: 'Lịch trình 20:30',
    topic: 'evening_rollcall_check',
    title: `20:30 - Kiểm tra đột xuất tác phong quân phục, râu tóc và móng tay`,
    narrative: `Trong giờ sinh hoạt đại đội 20:30, cán bộ bất ngờ lệnh cho các tiểu đội trưởng đi từng hàng rà soát tác phong: kiểm tra xem ai chưa bấm móng tay, tóc tai dài chạm vành tai, hoặc mang dép lê xuống sân điểm danh.`,
    speaker: {
      name: 'Đại đội phó',
      role: 'Cán bộ kiểm tra tác phong',
      avatarId: 'commander',
      mood: 'stern',
    },
    dialogue: 'Tất cả đưa hai bàn tay ra trước ngực! Quân phục cài đủ cúc cổ, đi giày có buộc dây! Ai để móng tay dài hoặc tóc tốt bước lên hàng đầu!',
    backgroundType: 'parade',
    isFixedSchedule: true,
    fixedTimeText: '20:30 - Sinh hoạt đại đội',
    choices: [
      {
        id: `d${day}_kttp_c1`,
        text: 'Tự tin xòe hai bàn tay sạch sẽ đã cắt tỉa gọn gàng, quân phục chỉnh tề tăm tắp',
        attributeEffects: { health: 0, morale: 5, reputation: 8, money: 0 },
        tipRewardId: 'tip_sinh_hoat_dai_doi_nghiem_tuc',
        outcomeText: 'Tác phong chỉn chu mẫu mực giúp bạn được cán bộ kiểm tra chấm điểm A cộng thi đua cho cả phòng 14 người!',
      },
      {
        id: `d${day}_kttp_c2`,
        text: 'Thò tay vào túi áo lục tìm bấm móng tay định cúi đầu bấm lén trong bóng tối',
        attributeEffects: { health: 0, morale: -5, reputation: -8, money: 0 },
        outcomeText: 'Hành động lén lút bị đại đội phó phát hiện ngay lập tức, bị nhắc nhở nghiêm khắc tác phong đối phó trước hàng quân!',
      },
      {
        id: `d${day}_kttp_c3`,
        text: 'Đứng nghiêm báo cáo trung thực nếu chưa kịp cắt móng tay và hứa mượn bấm móng tay cắt ngay sau giờ sinh hoạt',
        attributeEffects: { health: 0, morale: 3, reputation: 5, money: 0 },
        outcomeText: 'Thái độ thẳng thắn, thành khẩn nhận lỗi được cán bộ đánh giá cao, nhắc nhở phòng 14 người đôn đốc hỗ trợ nhau.',
      },
    ],
  };
}

export function createCommendationAndNightGuardSituation(day: number): StoryEvent {
  return {
    id: `d${day}_2030_bieu_duong_va_gac_dem`,
    day,
    phase: 'evening',
    phaseLabel: 'Tối',
    category: 'Lịch trình 20:30',
    topic: 'evening_rollcall_guard',
    title: `20:30 - Biểu dương phòng kiểu mẫu và phân công ca gác đặc biệt 02:00 sáng`,
    narrative: `Không khí buổi sinh hoạt tối nay lắng đọng khi Thầy công bố điểm chấm nội vụ 3 dây phơi và gấp chăn. Ngay sau đó là thông báo về ca gác rạng sáng từ 02:00 đến 03:30 tại trạm gác cổng doanh trại trong đêm gió lạnh.`,
    speaker: {
      name: 'Đại đội trưởng D2',
      role: 'Cán bộ chỉ huy',
      avatarId: 'commander',
      mood: 'normal',
    },
    dialogue: 'Hôm nay phòng 14 người của các đồng chí thể hiện tinh thần rất tốt! Tuy nhiên đêm nay sương lạnh buốt, ca trực gác 2h sáng ai xung phong nhận nhiệm vụ?',
    backgroundType: 'parade',
    isFixedSchedule: true,
    fixedTimeText: '20:30 - Sinh hoạt đại đội',
    choices: [
      {
        id: `d${day}_bdg_c1`,
        text: 'Mạnh dạn bước lên xung phong nhận ca gác đêm sương gió để rèn luyện bản lĩnh ý chí thép',
        attributeEffects: { health: -2, morale: 6, reputation: 12, money: 0 },
        tipRewardId: 'tip_chap_hanh_lenh_truc_ban',
        outcomeText: 'Sự dũng cảm và tinh thần cống hiến không ngại gian khổ khiến Thầy và các bạn trong đại đội vô cùng nể phục!',
      },
      {
        id: `d${day}_bdg_c2`,
        text: 'Đứng im cúi đầu lảng tránh ánh mắt của Thầy để khỏi bị gọi tên đi gác đêm',
        attributeEffects: { health: 0, morale: -2, reputation: -3, money: 0 },
        outcomeText: 'Bạn tránh được ca gác đêm nhưng cảm thấy hơi áy náy khi thấy bạn cùng phòng phải đi thay.',
      },
      {
        id: `d${day}_bdg_c3`,
        text: 'Đề xuất cùng Minh đăng ký gác theo cặp để hỗ trợ nhau và đảm bảo an toàn tuyệt đối',
        attributeEffects: { health: -1, morale: 5, reputation: 8, money: 0 },
        outcomeText: 'Phương án hợp lý được Thầy chấp thuận ngay, tình đồng chí giữa bạn và Minh thêm gắn kết bền chặt.',
      },
    ],
  };
}

export function createHeartToHeartSharingSituation(day: number): StoryEvent {
  return {
    id: `d${day}_2030_giao_luu_tam_su`,
    day,
    phase: 'evening',
    phaseLabel: 'Tối',
    category: 'Lịch trình 20:30',
    topic: 'evening_rollcall_share',
    title: `20:30 - Sinh hoạt đại đội giải tỏa tâm lý và lời dặn dò ấm áp của Thầy`,
    narrative: `Sau những ngày đầu kỷ luật thép đầy bỡ ngỡ, Thầy đại đội trưởng cho đại đội ngồi quây quần trên những chiếc ghế nhựa dưới bầu trời đêm Hòa Lạc để trò chuyện, hỏi thăm tâm tư tình cảm từng phòng 14 người.`,
    speaker: {
      name: 'Đại đội trưởng D2',
      role: 'Cán bộ chỉ huy',
      avatarId: 'commander',
      mood: 'normal',
    },
    dialogue: 'Học quân sự vất vả nhưng là kỷ niệm đời sinh viên! Có ai nhớ nhà quá hay gặp khó khăn gì trong nếp sống tập thể không, cứ mạnh dạn chia sẻ với Thầy!',
    backgroundType: 'courtyard',
    isFixedSchedule: true,
    fixedTimeText: '20:30 - Sinh hoạt đại đội',
    choices: [
      {
        id: `d${day}_glts_c1`,
        text: 'Mạnh dạn đứng lên chia sẻ cảm nghĩ thật lòng và cảm ơn Thầy cùng các bạn đã giúp đỡ',
        attributeEffects: { health: 0, morale: 10, reputation: 8, money: 0 },
        tipRewardId: 'tip_giu_vung_tinh_than_lac_quan',
        outcomeText: 'Lời tâm sự chân thành chạm đến trái tim cả đại đội, tiếng vỗ tay ròn rã làm ấm cả đêm đồi Hòa Lạc.',
      },
      {
        id: `d${day}_glts_c2`,
        text: 'Xung phong hát một bài acoustic mộc mạc tặng Thầy và cả đại đội',
        attributeEffects: { health: 0, morale: 12, reputation: 10, money: 0 },
        outcomeText: 'Giai điệu thân thương vang lên, cả đại đội cùng vỗ tay hát theo tạo nên một kỷ niệm khó quên.',
      },
      {
        id: `d${day}_glts_c3`,
        text: 'Ngồi lắng nghe những chia sẻ của đồng đội và vỗ tay hưởng ứng nhiệt tình',
        attributeEffects: { health: 0, morale: 7, reputation: 5, money: 0 },
        outcomeText: 'Khoảnh khắc đoàn kết giúp bạn cảm nhận sâu sắc tình đồng chí quân ngũ thiêng liêng.',
      },
    ],
  };
}

export function createStandardRollcallSituation(day: number): StoryEvent {
  return {
    id: `d${day}_fixed_evening`,
    day,
    phase: 'evening',
    phaseLabel: 'Tối',
    category: 'Lịch trình 20:30',
    topic: 'evening_rollcall',
    title: `20:30 - Sinh hoạt đại đội & Điểm danh buổi tối (Ngày ${day})`,
    narrative: `Đúng 20:30, toàn đại đội tập trung tại sân chào cờ. Đại đội trưởng nhận xét nội vụ trong ngày, biểu dương các phòng sạch sẽ, nhắc nhở các vi phạm và giao ban lịch trình sáng mai.`,
    speaker: {
      name: 'Đại đội trưởng D2',
      role: 'Cán bộ chỉ huy',
      avatarId: 'commander',
      mood: 'normal',
    },
    dialogue: 'Các đồng chí đứng nghiêm! Nhìn chung nội vụ hôm nay có tiến bộ, tuy nhiên một số phòng phơi đồ chưa đúng 3 dây thép. Đêm nay duy trì gác đúng giờ!',
    backgroundType: 'parade',
    isFixedSchedule: true,
    fixedTimeText: '20:30 - Mỗi tối',
    choices: [
      {
        id: `d${day}_fe_c1`,
        text: 'Mặc quân phục chỉnh tề, đứng nghiêm túc, hô to "Có!" dõng dạc khi điểm danh',
        attributeEffects: { health: 0, morale: 4, reputation: 6, money: 0 },
        tipRewardId: 'tip_sinh_hoat_dai_doi_nghiem_tuc',
        outcomeText: 'Tác phong chuẩn mực giúp tiểu đội bạn giữ vững vị trí dẫn đầu phong trào thi đua!',
      },
      {
        id: `d${day}_fe_c2`,
        text: 'Lắng nghe kỹ nhắc nhở của chỉ huy và ghi chép lại lịch trực gác vào sổ tay',
        attributeEffects: { health: 0, morale: 3, reputation: 5, money: 0 },
        outcomeText: 'Sự cẩn thận giúp phòng bạn luôn chủ động, không bao giờ bị động trước hiệu lệnh sáng mai.',
      },
      {
        id: `d${day}_fe_c3`,
        text: 'Góp ý nhẹ nhàng cho đồng đội đứng cạnh chỉnh lại cúc áo và quai mũ cối cho đúng điều lệnh',
        attributeEffects: { health: 0, morale: 4, reputation: 6, money: 0 },
        outcomeText: 'Tinh thần tương trợ đồng đội giúp cả hàng ngũ đứng thẳng tắp, không ai bị trừ điểm tác phong.',
      },
    ],
  };
}

// Hàm sinh sự kiện Tối 20:30 linh hoạt theo ngày
export function createFixedEveningRollcall(day: number): StoryEvent {
  if (day === 2 || day === 3) {
    // Tình huống yêu cầu: Tập trung muộn, Thầy cáu và mắng gay gắt
    return createLateRollcallAngryTeacherSituation(day);
  } else if (day === 4) {
    // Kiểm tra đột xuất móng tay, râu tóc, tác phong
    return createGroomingInspection2030Situation(day);
  } else if (day === 5) {
    // Biểu dương và phân công ca gác đặc biệt 02:00 sáng
    return createCommendationAndNightGuardSituation(day);
  } else if (day === 7) {
    // Giao lưu tâm sự tân binh đêm cuối tuần
    return createHeartToHeartSharingSituation(day);
  }
  // Mặc định Ngày 1 hoặc các ngày khác: Điểm danh chuẩn mực
  return createStandardRollcallSituation(day);
}

// 2. KHO TÌNH HUỐNG THƯỜNG NHẬT (Phân loại theo buổi Sáng - Chiều - Tối)
export const MORNING_SITUATIONS: StoryEvent[] = [
  {
    id: 'm_quy_chuan_do_tren_giuong',
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'Nề nếp & Kỷ luật',
    topic: 'bed_standard',
    title: 'Quy chuẩn đồ trên giường & Quạt cá nhân',
    narrative: 'Kiểm tra nội vụ sáng, bạn phát hiện trên giường mình vẫn còn chiếc quạt mini, lọ sáp môi và cuốn sổ tay.',
    speaker: {
      name: 'Bạn cùng phòng',
      role: 'Đồng đội phòng 14 người',
      avatarId: 'roommate',
      mood: 'worried',
    },
    dialogue: 'Cậu ơi mau cất đồ đi! Trên giường tuyệt đối chỉ được để chăn gối và quạt cá nhân quay lồng ra ngoài thôi!',
    backgroundType: 'dorm',
    choices: [
      {
        id: 'm_qcd_c1',
        text: 'Nhét toàn bộ sổ tay, mỹ phẩm xuống gầm giường trong ba lô cá nhân; đặt quạt ở cuối giường, quay lồng ra phía ngoài gọn gàng',
        attributeEffects: { reputation: 7, morale: 4 },
        tipRewardId: 'tip_quy_chuan_do_tren_giuong',
        outcomeText: 'Phản giường phẳng lì sạch bong, quạt quay đúng quy cách giúp phòng bạn đạt điểm A nội vụ sáng!',
      },
      {
        id: 'm_qcd_c2',
        text: 'Để nguyên quạt ở đầu giường cắm sạc, gom sổ và đồ lặt vặt nhét đại dưới mép chăn',
        attributeEffects: { reputation: -8, morale: -5 },
        outcomeText: 'Trực ban lật mép chăn lên phát hiện ngay đống đồ lộn xộn, bị nhắc nhở gay gắt trước toàn đại đội.',
      },
      {
        id: 'm_qcd_c3',
        text: 'Tiện tay nhét hết tất cả vào gối rồi kéo khóa lại',
        attributeEffects: { reputation: -6, morale: -3 },
        outcomeText: 'Chiếc gối cộm lên méo mó dị thường khiến người kiểm tra phát hiện ngay mánh khóe đối phó.',
      },
    ],
  },
  {
    id: 'truc_ban_tieu_doi',
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'military_duty',
    topic: 'duty_team',
    title: 'Kíp trực ban tiểu đội & Báo cháo bạn ốm',
    narrative: 'Bạn trong kíp trực ban (từ 16h30 hôm trước đến 16h30 hôm nay), sáng ra vừa phải quét hành lang vừa phải đi các phòng gom danh sách báo cháo cho bạn ốm trước giờ ăn.',
    speaker: {
      name: 'Tiểu đội trưởng',
      role: 'Trưởng kíp trực ban',
      avatarId: 'commander',
      mood: 'normal',
    },
    dialogue: 'Sắp đến giờ nhà ăn phát cháo rồi! Phải gom danh sách bạn ốm xuống xin giấy trạm y tế gấp nhé!',
    backgroundType: 'dorm',
    choices: [
      {
        id: 'tbt_c1',
        text: 'Dậy sớm trước báo thức 10 phút, phân công 1 bạn quét hành lang, bạn còn lại cùng mình cầm sổ đi từng phòng xác nhận danh sách rồi xuống y tế xin giấy',
        attributeEffects: { reputation: 12, morale: 6, health: -4 },
        tipRewardId: 'tip_chap_hanh_lenh_truc_ban',
        outcomeText: 'Tác phong chỉn chu khoa học giúp các bạn ốm được nhận cháo nóng đúng giờ, hành lang sạch bóng được chỉ huy khen ngợi!',
      },
      {
        id: 'tbt_c2',
        text: 'Quét vội hành lang rồi quên bẵng việc báo cháo, sát giờ ăn mới cuống cuồng chạy xuống bếp',
        attributeEffects: { reputation: -10, morale: -6 },
        outcomeText: 'Nhà bếp hết suất cháo dự phòng vì báo muộn, bạn phải xin lỗi các bạn ốm trong sự áy náy khôn nguôi.',
      },
      {
        id: 'tbt_c3',
        text: 'Đùn đẩy việc ghi sổ báo cháo cho tiểu đội trưởng để mình chỉ làm việc nhẹ là mở rèm nhà ăn',
        attributeEffects: { reputation: -6, morale: -2, health: 2 },
        outcomeText: 'Thái độ trốn tránh việc khó làm đồng đội trực ban khó chịu, làm giảm sút uy tín cá nhân.',
      },
    ],
  },
  {
    id: 've_sinh_khu_vuc_dai_doi',
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'military_duty',
    topic: 'area_cleaning',
    title: 'Vệ sinh khu vực đại đội sân trước D2 (Miễn chạy dài)',
    narrative: 'Sáng sớm được phân công quét khu vực sân trước khung nhà D2 cùng đại đội (được miễn chạy dài thể dục). Nhà kho rất thiếu hót rác nên phải chủ động chuẩn bị.',
    speaker: {
      name: 'Bạn cùng phòng',
      role: 'Tổ trực khu vực',
      avatarId: 'roommate',
      mood: 'normal',
    },
    dialogue: 'Hôm nay được miễn chạy dài 1500m sướng thật, nhưng nghe nói kho hết sạch hót rác rồi đấy!',
    backgroundType: 'courtyard',
    choices: [
      {
        id: 'vskv_c1',
        text: 'Nhớ lời dặn, chủ động cầm sẵn hót rác của phòng mình và xin thêm túi rác ở phòng giặt mang xuống hiện trường cùng chổi',
        attributeEffects: { reputation: 8, morale: 5, health: 2 },
        tipRewardId: 'tip_giup_do_ban_cung_phong',
        outcomeText: 'Sự chu đáo giúp tổ của bạn thu dọn sạch sẽ lá rụng trong nháy mắt, vừa thảnh thơi vừa được miễn chạy dài!',
      },
      {
        id: 'vskv_c2',
        text: 'Chỉ cầm tay không xuống nhà kho lấy chổi, đến nơi hết sạch hót rác đành phải dùng bìa carton vun lá cây mất thời gian',
        attributeEffects: { reputation: -4, morale: -4 },
        outcomeText: 'Bìa carton rách nát làm lá bay tứ tung, quét mãi không xong khiến bạn trễ cả giờ ăn sáng.',
      },
      {
        id: 'vskv_c3',
        text: 'Tranh thủ quét qua loa vài đường rồi lẩn vào góc căng-tin ngồi nghỉ chờ các bạn làm xong',
        attributeEffects: { reputation: -8, morale: -2, health: 4 },
        outcomeText: 'Hành vi trốn việc bị cán bộ kiểm tra bắt gặp, cả tổ bị phê bình và phạt trực nhật bù thêm 2 buổi chiều!',
      },
    ],
  },
  {
    id: 'm_danh_dau_quan_phuc',
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'Quản lý đồ dùng',
    topic: 'uniform',
    title: 'Đánh dấu nhận diện 2 bộ quân trang màu xanh',
    narrative: 'Cầm trên tay 2 bộ quần áo dã chiến màu xanh giống hệt của mọi người, nguy cơ thất lạc khi đem giặt phơi chung trên sân phơi là rất cao.',
    speaker: {
      name: 'An',
      role: 'Lớp phó',
      avatarId: 'an',
      mood: 'smile',
    },
    dialogue: 'Đừng lấy bút lông viết to lên áo nhé, vừa mất thẩm mỹ vừa bị thầy phạt đền tiền đấy!',
    backgroundType: 'dorm',
    choices: [
      {
        id: 'm_dd_c1',
        text: 'Dùng bút bi kẹp một sợi chỉ màu nhỏ ở mác áo để nhận diện, tuyệt đối không viết vẽ lên vải',
        attributeEffects: { health: 0, morale: 4, reputation: 6, money: 0 },
        tipRewardId: 'tip_tranh_phat_tien_quan_trang',
        inventoryRewardId: 'bo_kim_chi_mini',
        outcomeText: 'Cách đánh dấu thông minh, tinh tế giúp đồ của bạn không bao giờ bị lẫn mà quân phục vẫn nguyên vẹn.',
      },
      {
        id: 'm_dd_c2',
        text: 'Lấy bút lông dầu viết tên thật to trước ngực áo cho đỡ lẫn',
        attributeEffects: { health: 0, morale: -4, reputation: -8, money: -50000 },
        outcomeText: 'Đại đội trưởng kiểm tra nhìn thấy và phê bình gay gắt tác phong làm hỏng quân trang, bị phạt đền tiền áo!',
      },
      {
        id: 'm_dd_c3',
        text: 'Dùng chỉ đỏ thêu một dấu chấm nhỏ kín đáo ở mặt trong gấu áo',
        attributeEffects: { health: 0, morale: 5, reputation: 7, money: 0 },
        outcomeText: 'Cách nhận diện cực kỳ khéo léo và thẩm mỹ, bạn cùng phòng phải học tập theo bạn ngay.',
      },
    ],
  },
  {
    id: 'm_coi_bao_thuc',
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'Kỷ luật & Tác phong',
    topic: 'wakeup',
    title: 'Tiếng còi báo thức 05:30 toàn D2',
    narrative: 'Đúng 05:30, tiếng còi báo thức toàn D2 vang lên xé tan màn sương sớm Hòa Lạc. Cả phòng chỉ có 10 phút để vệ sinh, gấp chăn màn và xếp hàng dưới sân.',
    speaker: {
      name: 'Huy',
      role: 'Bạn cùng phòng',
      avatarId: 'huy',
      mood: 'worried',
    },
    dialogue: 'Trời ơi mới 5h30 mà lạnh quá! Cậu đã dậy chưa, kéo tớ dậy với!',
    backgroundType: 'dorm',
    choices: [
      {
        id: 'm_cbt_c1',
        text: 'Bật dậy ngay lập tức, gập màn và gọi các bạn cùng phòng cùng dậy chia việc dọn nội vụ',
        attributeEffects: { health: 2, morale: 4, reputation: 6, money: 0 },
        tipRewardId: 'tip_chuan_bi_tu_toi_hom_truoc',
        outcomeText: 'Nhờ sự chủ động của bạn, phòng bạn là đơn vị đầu tiên xếp hàng tề chỉnh dưới sân trước giờ G.',
      },
      {
        id: 'm_cbt_c2',
        text: 'Nằm nấn ná trên giường đến 6h rồi cuống cuồng chạy thục mạng ra sân',
        attributeEffects: { health: -3, morale: -4, reputation: -6, money: 0 },
        outcomeText: 'Bị ghi tên vào sổ trực ban vì chậm giờ tập trung, chăn màn trong phòng chưa kịp gấp bị nhắc nhở.',
      },
      {
        id: 'm_cbt_c3',
        text: 'Dậy từ 5h15 trước kẻng 15 phút để đánh răng rửa mặt thong thả trước khi còi hú',
        attributeEffects: { health: 3, morale: 5, reputation: 7, money: 0 },
        outcomeText: 'Tác phong "đi trước một bước" giúp bạn không phải chen chúc bồn rửa và chỉnh tề trước mọi người!',
      },
    ],
  },
  {
    id: 'm_gap_chan_vuong_vuc',
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'Nề nếp & Kỷ luật',
    topic: 'blanket_neat',
    title: 'Cách gấp chăn màn vuông vức 4 góc',
    narrative: 'Chăn và màn gấp sẵn được nắn vuốt mép bằng bìa/thước dài sao cho phẳng phiu, vuông vức 4 góc đặt ngay ngắn ở đầu giường. Gấp ẩu sẽ bị phạt trưa xuống phòng học gấp lại.',
    speaker: {
      name: 'Linh',
      role: 'Bạn học phòng 14 người',
      avatarId: 'linh',
      mood: 'normal',
    },
    dialogue: 'Cậu ơi lấy thước kẻ dài hoặc tấm bìa cứng miết mép chăn này! Gấp ẩu là trưa bị gọi tên xuống phòng học gấp lại đấy!',
    backgroundType: 'dorm',
    choices: [
      {
        id: 'm_gcvv_c1',
        text: 'Dùng mép thước dài miết phẳng từng đường gấp, nắn 4 góc vuông vức sắc sảo rồi đặt ngay ngắn ở đầu giường',
        attributeEffects: { reputation: 8, morale: 5, health: 0 },
        tipRewardId: 'tip_gap_chan_con_lon',
        outcomeText: 'Chiếc chăn vuông vức phẳng lì như viên gạch, được tiểu đội trực ban chấm điểm tối đa trong đợt kiểm tra sáng!',
      },
      {
        id: 'm_gcvv_c2',
        text: 'Gấp qua loa vội vàng cho xong rồi chạy ra sân, chăn méo mó phồng to tướng',
        attributeEffects: { reputation: -8, morale: -5, health: -2 },
        outcomeText: 'Trưa nắng chang chang bị gọi tên phạt xuống phòng học gấp lại chăn 3 lần, mất luôn giấc ngủ trưa quý báu!',
      },
      {
        id: 'm_gcvv_c3',
        text: 'Nhờ bạn khéo tay trong phòng phụ giữ mép để mình vuốt phẳng 4 góc chăn',
        attributeEffects: { reputation: 6, morale: 6, health: 1 },
        outcomeText: 'Sự hợp lực nhịp nhàng giúp chăn màn của cả hai đều phẳng phiu, tình bạn trong phòng 14 người thêm gắn kết.',
      },
    ],
  },
  {
    id: 'm_chieu_coi_ngan',
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'Nề nếp & Phòng ở',
    topic: 'dorm_bed',
    title: 'Chiếc chiếu cói ngắn hơn phản gỗ',
    narrative: 'Chiếc chiếu cói được phát hơi ngắn so với chiều dài của chiếc phản gỗ giường tầng. Nếu kéo bừa bãi sẽ bị lệch chuẩn nội vụ.',
    speaker: {
      name: 'An',
      role: 'Lớp phó',
      avatarId: 'an',
      mood: 'normal',
    },
    dialogue: 'Nhìn mẫu phòng mẫu đi cậu, chiếu ngắn thì mép chân phải bằng phẳng với mép phản nhé!',
    backgroundType: 'dorm',
    choices: [
      {
        id: 'm_ccn_c1',
        text: 'Kéo mép chiếu bằng phẳng với mép phản phía dưới chân, để hở khoảng trống phía đầu giường theo mẫu',
        attributeEffects: { health: 1, morale: 2, reputation: 5, money: 0 },
        tipRewardId: 'tip_trai_chieu_dung_mau',
        outcomeText: 'Chiếu phẳng phiu tăm tắp, đúng quy chuẩn quân đội khiến giường ngủ trông gọn gàng hẳn.',
      },
      {
        id: 'm_ccn_c2',
        text: 'Kéo chiếu phủ kín đầu giường làm mép dưới chân bị hụt một khoảng nham nhở',
        attributeEffects: { health: 0, morale: -1, reputation: -3, money: 0 },
        outcomeText: 'Trực ban chấm điểm nhắc nhở vì chiếu bị xô lệch, không đồng bộ với cả dãy giường.',
      },
      {
        id: 'm_ccn_c3',
        text: 'Kéo căng bốn góc chiếu và dắt nhẹ mép thừa vào khe giường để chiếu không bị xô lệch khi nằm',
        attributeEffects: { health: 0, morale: 4, reputation: 5, money: 0 },
        outcomeText: 'Mặt chiếu căng phẳng như mặt trống, dù trở mình cũng không hề bị nhăn nhúm.',
      },
    ],
  },
  {
    id: 'm_an_sang_banh_mi',
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'Ăn uống & Sức khỏe',
    topic: 'breakfast',
    title: 'Bữa sáng bánh mì dai và hộp sữa',
    narrative: 'Đồ ăn sáng là xúc xích nóng, một cái bánh mì dai đặc trưng và 1 hộp sữa tươi. Ngoài sân, nắng sớm bắt đầu gay gắt.',
    speaker: {
      name: 'Minh',
      role: 'Bạn cùng phòng',
      avatarId: 'minh',
      mood: 'worried',
    },
    dialogue: 'Bánh mì hơi dai một chút nhưng cố ăn đi cậu, tí nữa đứng nắng 3 tiếng ngoài sân đói lả đấy!',
    backgroundType: 'canteen',
    choices: [
      {
        id: 'm_as_c1',
        text: 'Cố gắng nhai hết cái bánh mì và uống nhiều nước lọc để lấy năng lượng luyện tập',
        attributeEffects: { health: 10, morale: 3, reputation: 2, money: 0 },
        tipRewardId: 'tip_an_sang_du_nang_luong',
        inventoryRewardId: 'sua_hop',
        outcomeText: 'Bụng no ấm giúp bạn đứng vững vàng suốt 3 tiếng điều lệnh dưới trời nắng mà không hề hoa mắt.',
      },
      {
        id: 'm_as_c2',
        text: 'Chê dai, vứt vào sọt rác để bụng đói ra sân tập',
        attributeEffects: { health: -25, morale: -8, reputation: -4, money: 0 },
        outcomeText: 'Đến 08:30 đứng tập dưới nắng, bạn bị hoa mắt chóng mặt vì tụt đường huyết và phải vào phòng y tế nằm nghỉ!',
      },
      {
        id: 'm_as_c3',
        text: 'Kẹp xúc xích vào trong ruột bánh mì, chấm cùng sữa tươi cho dễ nuốt',
        attributeEffects: { health: 8, morale: 5, reputation: 2, money: 0 },
        outcomeText: 'Cách ăn sáng sáng tạo biến ổ bánh mì dai thành món ăn ngon miệng, năng lượng dồi dào!',
      },
    ],
  },
  {
    id: 'm_banh_te_banh_nep',
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'Ăn uống & Sức khỏe',
    topic: 'breakfast',
    title: 'Suất ăn sáng bánh tẻ và bánh nếp',
    narrative: 'Sáng nay mỗi bạn có 1 chiếc bánh tẻ và 1 chiếc bánh nếp. Hai bạn cùng phòng không thích ăn đồ nếp nên bảo bạn ăn hộ nếu muốn.',
    speaker: {
      name: 'Huy',
      role: 'Bạn cùng phòng',
      avatarId: 'huy',
      mood: 'laugh',
    },
    dialogue: 'Tớ nhường cậu cả 2 cái bánh nếp này đấy, ăn nhiều cho khỏe bắp chân nhé!',
    backgroundType: 'dorm',
    choices: [
      {
        id: 'm_bt_c1',
        text: 'Chỉ ăn vừa đủ phần của mình cung cấp năng lượng, khuyên các bạn nên ăn lót dạ',
        attributeEffects: { health: 6, morale: 4, reputation: 4, money: 0 },
        tipRewardId: 'tip_khong_lang_phi_thuc_an',
        outcomeText: 'Cơ thể nhẹ nhàng, tiêu hóa êm ái, sẵn sàng cho những bài tập thể lực dẻo dai.',
      },
      {
        id: 'm_bt_c2',
        text: 'Ăn cả 2 chiếc bánh nếp của bạn, tổng cộng ăn 4 chiếc bánh nhiều dầu mỡ',
        attributeEffects: { health: -8, morale: -4, reputation: 0, money: 0 },
        outcomeText: 'Bụng đầy hơi ậm ạch vì ăn quá nhiều đồ nếp dầu mỡ lúc sáng sớm, chạy nhảy tập luyện rất khó chịu!',
      },
      {
        id: 'm_bt_c3',
        text: 'Gói chiếc bánh nếp thừa vào giấy ăn sạch mang theo balo để dành đến giờ giải lao 9h',
        attributeEffects: { health: 5, morale: 5, reputation: 2, money: 0 },
        outcomeText: 'Đến giữa giờ tập luyện khi mọi người bắt đầu đói cồn cào, chiếc bánh nếp trở thành "cứu tinh" tuyệt vời.',
      },
    ],
  },
  {
    id: 'm_hanh_quan_len_lop',
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'Điều lệnh & Đội ngũ',
    topic: 'formation',
    title: 'Đúng 06:40 hành quân lên khu giảng đường',
    narrative: 'Đúng 06:40, toàn đại đội tập hợp trước sân D2 để hành quân thành hàng ngũ lên khu giảng đường trên đồi.',
    speaker: {
      name: 'Đại đội phó',
      role: 'Cán bộ dẫn quân',
      avatarId: 'commander',
      mood: 'stern',
    },
    dialogue: 'Các trung đội gióng hàng! Đi đều bước! Một! Hai! Giữ cự ly 2 bước chân!',
    backgroundType: 'courtyard',
    choices: [
      {
        id: 'm_hq_c1',
        text: 'Đứng đúng cự ly hàng dọc, bước đều theo khẩu lệnh chỉ huy, không nói chuyện riêng',
        attributeEffects: { health: 2, morale: 3, reputation: 6, money: 0 },
        tipRewardId: 'tip_ky_luat_gio_giac',
        outcomeText: 'Khối hành quân đi đều tăm tắp như một bức tường thép, được chỉ huy khen ngợi tác phong nghiêm trang.',
      },
      {
        id: 'm_hq_c2',
        text: 'Vừa đi vừa cầm gương mini soi và tách hàng ghé quán mua nước ngọt',
        attributeEffects: { health: -1, morale: -2, reputation: -8, money: -15000 },
        outcomeText: 'Bị đại đội phó thổi còi bắt đứng lại nhắc nhở tác phong tùy tiện trước hàng quân!',
      },
      {
        id: 'm_hq_c3',
        text: 'Tập trung bắt nhịp bước chân cùng bạn đi trước, nhắc khẽ bạn đi sau không giẫm gót giày',
        attributeEffects: { health: 1, morale: 4, reputation: 5, money: 0 },
        outcomeText: 'Hàng ngũ chuyển động nhịp nhàng, tạo nên một đội hình hành quân chuẩn mực.',
      },
    ],
  },
  {
    id: 'm_tap_the_duc_0545',
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'Thể lực & Buổi sáng',
    topic: 'exercise',
    title: '05:45 Tập thể dục 4 bài thể dục buổi sáng ngoài sân chào cờ',
    narrative: 'Sương sớm còn đọng trên cỏ, cả đại đội dàn hàng ngang 3 bước cự ly tập 4 bài thể dục quân đội để khởi động ngày mới.',
    speaker: {
      name: 'Đại đội phó',
      role: 'Cán bộ huấn luyện',
      avatarId: 'commander',
      mood: 'stern',
    },
    dialogue: 'Động tác tay ngực! Một! Hai! Đánh tay mạnh mẽ, dứt khoát!',
    backgroundType: 'parade',
    choices: [
      {
        id: 'm_ttd_c1',
        text: 'Hít thở sâu không khí trong lành, tập hết biên độ động tác giúp làm nóng toàn bộ cơ thể',
        attributeEffects: { health: 5, morale: 4, reputation: 4, money: 0 },
        tipRewardId: 'tip_an_sang_du_nang_luong',
        outcomeText: 'Máu huyết lưu thông sảng khoái, mọi cơn buồn ngủ tan biến sạch sẽ!',
      },
      {
        id: 'm_ttd_c2',
        text: 'Tập uể oải, vung tay cho có lệ vì thấy sáng sớm gió lạnh',
        attributeEffects: { health: 0, morale: -2, reputation: -4, money: 0 },
        outcomeText: 'Bị cán bộ chỉ huy gọi tên chấn chỉnh tác phong trước đại đội.',
      },
      {
        id: 'm_ttd_c3',
        text: 'Quan sát nhịp đếm của người dẫn đầu, vừa tập vừa giữ cự ly đều đặn với hai bên',
        attributeEffects: { health: 4, morale: 4, reputation: 5, money: 0 },
        outcomeText: 'Đội hình đồng đều tăm tắp, bạn nhận được cái gật đầu hài lòng từ chỉ huy.',
      },
    ],
  },
  {
    id: 'm_truc_nhat_phong',
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'Vệ sinh & Nề nếp',
    topic: 'cleaning',
    title: 'Phiên trực nhật quét dọn hành lang và cầu thang',
    narrative: 'Sáng nay đến lượt phòng bạn cử người đi quét sạch hành lang chung và đổ rác tầng 2.',
    speaker: {
      name: 'An',
      role: 'Lớp phó',
      avatarId: 'an',
      mood: 'normal',
    },
    dialogue: 'Hôm nay phòng mình trực nhật tầng, ai xung phong cầm chổi quét sảnh nào?',
    backgroundType: 'dorm',
    choices: [
      {
        id: 'm_tnp_c1',
        text: 'Xung phong cầm chổi quét sạch hành lang và thu gom rác đúng nơi quy định',
        attributeEffects: { health: 1, morale: 3, reputation: 8, money: 0 },
        tipRewardId: 'tip_giup_do_ban_cung_phong',
        outcomeText: 'Hành lang sạch bong kin kít, trực ban chấm điểm tối đa cho tầng của bạn.',
      },
      {
        id: 'm_tnp_c2',
        text: 'Đùn đẩy việc cho bạn khác vì ngại bẩn tay',
        attributeEffects: { health: 0, morale: -4, reputation: -7, money: 0 },
        outcomeText: 'Các bạn trong phòng tỏ thái độ bất bình vì tính lười nhác thiếu tập thể.',
      },
      {
        id: 'm_tnp_c3',
        text: 'Phân chia mỗi người một đoạn hành lang, cùng làm 5 phút là sạch bóng',
        attributeEffects: { health: 1, morale: 5, reputation: 7, money: 0 },
        outcomeText: 'Cách tổ chức làm việc nhóm khoa học giúp công việc hoàn thành nhanh gọn trong tiếng cười vui vẻ.',
      },
    ],
  },
  {
    id: 'm_sjc_tui_tote',
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'sjc_item_event',
    topic: 'sjc_tote',
    title: '[SÁNG] Nhiều đồ & Túi tote thần kỳ SJC',
    narrative: 'Các buổi đi học, bạn vừa phải mang giáo trình Quốc phòng, sổ tay, bình nước, kem chống nắng, ô. Tay ôm nách tha rất dễ rơi rớt giữa đường.',
    speaker: {
      name: 'Minh',
      role: 'Bạn cùng phòng',
      avatarId: 'minh',
      mood: 'worried',
    },
    dialogue: 'Nhiều sách vở tài liệu với bình nước thế này ôm sao hết cậu ơi, khéo rơi dọc đường dốc mất!',
    backgroundType: 'dorm',
    isSjc: true,
    sjcBadge: '[ĐẶC QUYỀN SJC]',
    choices: [
      {
        id: 'm_sjc_tt_c1',
        text: 'Nhét tất cả giáo trình, sổ tay và đồ cá nhân gọn gàng vào chiếc Túi tote thần kỳ SJC rồi khoác lên vai',
        attributeEffects: { health: 2, morale: 5, reputation: 6, money: 0 },
        tipRewardId: 'tip_chuan_bi_tu_toi_hom_truoc',
        inventoryRewardId: 'sjc_tui_tote',
        outcomeText: 'Chiếc túi tote canvas SJC bền bỉ, phong cách giúp bạn mang trọn tài liệu mà hai tay vẫn tự do, tác phong nhanh nhẹn và tự tin!',
      },
      {
        id: 'm_sjc_tt_c2',
        text: 'Tay ôm chồng sổ sách lỉnh kỉnh vội vã chạy theo đoàn, bị trượt tay rơi đồ và đi chậm so với đại đội',
        attributeEffects: { health: -2, morale: -4, reputation: -3, money: 0 },
        outcomeText: 'Sách vở rơi lả tả xuống đường nhựa, bạn phải dừng lại nhặt khiến cả trung đội phải chờ đợi nhắc nhở.',
      },
      {
        id: 'm_sjc_tt_c3',
        text: 'Nhét tạm vài cuốn sách vào lưng quần quân phục và nhờ bạn cùng phòng cầm hộ bình nước, vừa đi vừa lo rơi',
        attributeEffects: { health: 0, morale: -2, reputation: -1, money: 0 },
        outcomeText: 'Dáng đi gượng gạo làm nhăn mép giáo trình, vừa đi vừa lo lắng nhưng may mắn không bị rơi đồ giữa đường.',
      },
    ],
  },
  {
    id: 'm_sjc_co_dong_hoc',
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'sjc_item_event',
    topic: 'sjc_mobile_study',
    title: '[SÁNG] Tác phong cơ động & Túi tote SJC chuyển lớp học',
    narrative: '06:45 sáng, lệnh chuyển phòng học sang giảng đường trên đồi phát ra đột xuất, chỉ có 5 phút chuẩn bị toàn bộ đồ dùng học tập và tài liệu.',
    speaker: {
      name: 'An',
      role: 'Lớp phó',
      avatarId: 'an',
      mood: 'smile',
    },
    dialogue: 'Đại đội chuyển địa điểm học lên giảng đường đồi cao! 5 phút nữa tập trung dưới sảnh nhé cả phòng 14 người!',
    backgroundType: 'dorm',
    isSjc: true,
    sjcBadge: '[ĐẶC QUYỀN SJC]',
    choices: [
      {
        id: 'm_sjc_cdh_c1',
        text: 'Mở Túi tote SJC đa năng, bỏ nhanh tài liệu, bút vở và bình nước vào rồi khoác vai cơ động ngay lập tức',
        attributeEffects: { health: 2, morale: 6, reputation: 7, money: 0 },
        tipRewardId: 'tip_ky_luat_gio_giac',
        outcomeText: 'Tác phong nhanh nhẹn mẫu mực, đồ đạc xếp gọn trong nháy mắt giúp bạn có mặt tại giảng đường mới trước giờ quy định!',
      },
      {
        id: 'm_sjc_cdh_c2',
        text: 'Loay hoay tìm túi nilon đựng đồ, làm rơi sách vở và bị trễ hàng ngũ xuất phát',
        attributeEffects: { health: -2, morale: -5, reputation: -6, money: 0 },
        outcomeText: 'Bị đại đội phó nhắc nhở trước hàng quân vì tác phong lề mề, sách vở bị quăn mép dơ bẩn.',
      },
      {
        id: 'm_sjc_cdh_c3',
        text: 'Nhờ bạn cầm hộ từng món rời rạc, vừa chạy vừa lo rơi tài liệu học tập giữa dốc đồi',
        attributeEffects: { health: -1, morale: -2, reputation: -2, money: 0 },
        outcomeText: 'Chạy thở không ra hơi lên tới đồi, may mắn tài liệu không bị thất lạc giữa đường.',
      },
    ],
  },
];

export const AFTERNOON_SITUATIONS: StoryEvent[] = [
  {
    id: 'truc_ban_nha_an_chieu',
    phase: 'afternoon',
    phaseLabel: 'Chiều',
    category: 'military_duty',
    topic: 'mess_hall_duty',
    title: 'Trực ban nhà ăn đại đội & Chuẩn bị mâm cơm 6 người',
    narrative: '16:30 chiều, tiểu đội bạn được phân công làm nhiệm vụ trực nhật nhà ăn đại đội: lau khô bàn ăn inox, xếp chuẩn 6 bát - 6 đôi đũa cho từng mâm và bưng cơm canh nóng sốt chia đều trước khi đại đội hành quân vào ăn.',
    speaker: {
      name: 'Tiểu đội trưởng',
      role: 'Trưởng kíp trực ban',
      avatarId: 'commander',
      mood: 'normal',
    },
    dialogue: 'Mâm nào cũng phải đủ 6 bát, đũa phải dùng khăn sạch lau khô ráo, chia đều thức ăn để đồng đội đi tập về là có cơm nóng ăn ngay nhé!',
    backgroundType: 'canteen',
    choices: [
      {
        id: 'tbna_c1',
        text: 'Tỉ mỉ lau khô từng đôi đũa, xếp bàn ăn ngay ngắn và chia đều từng phần thức ăn nóng sốt',
        attributeEffects: { reputation: 8, morale: 5, health: -2 },
        tipRewardId: 'tip_ky_luat_tu_giac_tap_the',
        outcomeText: 'Mâm cơm tươm tất chuẩn bị chu đáo khiến cả đại đội tấm tắc khen ngợi, kíp trực ban được thầy quản lý nhà ăn biểu dương!',
      },
      {
        id: 'tbna_c2',
        text: 'Chia thức ăn qua loa, để đũa còn ướt và bát đĩa lộn xộn khiến các bạn vào ăn phải tự đi đổi đũa',
        attributeEffects: { reputation: -6, morale: -4 },
        outcomeText: 'Đồng đội phàn nàn vì đũa ướt dính, tiểu đội bị nhắc nhở phải ở lại dọn dẹp vệ sinh nhà ăn sau bữa cơm.',
      },
      {
        id: 'tbna_c3',
        text: 'Nhanh nhẹn phụ các cô cấp dưỡng bê nồi canh lớn và bưng khay cơm phụ các dãy bàn bên cạnh',
        attributeEffects: { reputation: 6, morale: 8, health: 1 },
        tipRewardId: 'tip_giup_do_ban_cung_phong',
        outcomeText: 'Sự nhiệt tình xông xáo giúp công việc xong sớm, các cô cấp dưỡng quý mến thưởng thêm cho tiểu đội đĩa dưa hấu mát lạnh!',
      },
    ],
  },
  {
    id: 'a_nha_an_10h30',
    phase: 'afternoon',
    phaseLabel: 'Chiều',
    category: 'Ăn uống & Tập thể',
    topic: 'lunch',
    title: '10h30 đại đội tập trung vào nhà ăn',
    narrative: 'Sau một buổi học căng thẳng, kẻng nhà ăn vang lên dồn dập. Bàn ăn inox đã bày sẵn mâm cơm nóng hổi dành cho 6 người.',
    speaker: {
      name: 'Linh',
      role: 'Bạn cùng mâm',
      avatarId: 'linh',
      mood: 'smile',
    },
    dialogue: 'Cơm nóng canh ngọt này các bạn ơi! Ăn xong chúng mình cùng dọn bàn nhé!',
    backgroundType: 'canteen',
    choices: [
      {
        id: 'a_na_c1',
        text: 'Ăn uống từ tốn, cùng 5 bạn trong mâm phân công người xếp bát đĩa, người gom thức ăn thừa',
        attributeEffects: { health: 8, morale: 5, reputation: 6, money: 0 },
        tipRewardId: 'tip_chia_com_cong_bang',
        outcomeText: 'Mâm cơm sạch sẽ, ấm áp tình đồng chí. Các cô chú nuôi quân nhìn mâm bàn dọn ngăn nắp rất hài lòng.',
      },
      {
        id: 'a_na_c2',
        text: 'Ăn vội vã cho xong rồi đứng dậy bỏ đi trước, để mặc bát đũa cho bạn cùng mâm dọn',
        attributeEffects: { health: 2, morale: -5, reputation: -6, money: 0 },
        outcomeText: 'Hành động vô ý thức khiến các bạn cùng mâm phiền lòng và đánh giá thấp tinh thần tập thể của bạn.',
      },
      {
        id: 'a_na_c3',
        text: 'Xới cơm chia đều cho cả 6 bát trước khi ăn và chủ động lấy thêm canh nóng cho các bạn',
        attributeEffects: { health: 6, morale: 6, reputation: 8, money: 0 },
        outcomeText: 'Sự chu đáo và tinh tế của bạn khiến mâm cơm chan hòa tình cảm đồng chí thân thương.',
      },
    ],
  },
  {
    id: 'a_xep_giay_dep',
    phase: 'afternoon',
    phaseLabel: 'Chiều',
    category: 'Nề nếp & Kỷ luật',
    topic: 'shoes',
    title: 'Đôi giày vải dính đầy bụi đất và giá dép',
    narrative: 'Đi học về mệt mỏi, đôi giày vải dính đầy bụi đất đỏ. Một bạn cùng phòng tháo dép vứt ngang cửa chắn lối đi.',
    speaker: {
      name: 'An',
      role: 'Lớp phó',
      avatarId: 'an',
      mood: 'normal',
    },
    dialogue: 'Dép để lộn xộn thế kia trực ban đi qua trừ điểm cả phòng đấy, xếp lên giá ngay đi nào!',
    backgroundType: 'dorm',
    choices: [
      {
        id: 'a_xgd_c1',
        text: 'Nhắc bạn cùng xếp giày dép từ phải qua trái, từ to đến nhỏ, kín tầng 1 mới xếp tầng 2 và quét sạch gạch',
        attributeEffects: { health: 1, morale: 4, reputation: 6, money: 0 },
        tipRewardId: 'tip_xep_giay_dep_thang_hang',
        inventoryRewardId: 'dep_di_trong_nha',
        outcomeText: 'Giá giày dép gọn gàng như trong doanh trại chính quy! Cả phòng được cộng điểm tác phong nội vụ.',
      },
      {
        id: 'a_xgd_c2',
        text: 'Đi cả giày dính bụi vào trong phòng rồi tiện chân đá dép vào gầm bàn',
        attributeEffects: { health: -1, morale: -4, reputation: -8, money: 0 },
        outcomeText: 'Bụi đất vương vãi khắp sàn gạch vừa lau, khiến bạn trực nhật bức xúc càu nhàu.',
      },
      {
        id: 'a_xgd_c3',
        text: 'Dùng khăn ẩm lau sơ qua mũi giày dính bụi trước khi đặt ngay ngắn lên tầng trên của giá dép',
        attributeEffects: { health: 0, morale: 4, reputation: 7, money: 0 },
        outcomeText: 'Đôi giày sạch đẹp tề chỉnh, phòng ở luôn giữ được độ sáng bóng sạch sẽ.',
      },
    ],
  },
  {
    id: 'a_tat_cau_dao_quat',
    phase: 'afternoon',
    phaseLabel: 'Chiều',
    category: 'Kỷ luật & An toàn',
    topic: 'electricity',
    title: 'Người đi cuối cùng trước giờ học chiều',
    narrative: 'Giờ tập trung học chiều đến, cả phòng vội vã kéo nhau xuống sân. Bạn là người bước ra khỏi phòng cuối cùng.',
    speaker: {
      name: 'Minh',
      role: 'Bạn cùng phòng',
      avatarId: 'minh',
      mood: 'worried',
    },
    dialogue: 'Nhanh lên cậu ơi, sắp đến giờ tập hợp dưới sân rồi kìa!',
    backgroundType: 'dorm',
    choices: [
      {
        id: 'a_tcd_c1',
        text: 'Kiểm tra tắt cầu dao, rút phích cắm và quấn gọn dây vào chân quạt trước khi khép cửa',
        attributeEffects: { health: 0, morale: 2, reputation: 6, money: 0 },
        tipRewardId: 'tip_tat_dien_tiet_kiem',
        outcomeText: 'Thói quen cẩn trọng đảm bảo an toàn phòng chống cháy nổ và giữ trọn điểm thi đua phòng ở.',
      },
      {
        id: 'a_tcd_c2',
        text: 'Thấy quạt còn quay nhưng cứ để quay vù vù cho thoáng nhà rồi đóng cửa đi',
        attributeEffects: { health: 0, morale: -2, reputation: -8, money: 0 },
        outcomeText: 'Đoàn cán bộ kiểm tra phòng phát hiện quạt quay phòng trống, lập biên bản trừ điểm nề nếp toàn phòng!',
      },
      {
        id: 'a_tcd_c3',
        text: 'Tắt nhanh công tắc quạt và khóa chốt then cửa sổ cẩn thận đề phòng gió lốc chiều',
        attributeEffects: { health: 0, morale: 3, reputation: 7, money: 0 },
        outcomeText: 'Hành động nhanh gọn và chuẩn xác, bảo vệ an toàn đồ đạc cho cả phòng.',
      },
    ],
  },
  {
    id: 'a_san_phoi_3_day',
    phase: 'afternoon',
    phaseLabel: 'Chiều',
    category: 'Vệ sinh & Kỷ luật',
    topic: 'laundry',
    title: 'Trận địa phơi đồ trên sân phơi 3 dây thép',
    narrative: 'Buổi chiều giặt xong cả chậu quân phục ướt, sân phơi tầng thượng lộng gió có 3 dây thép căng ngang theo quy định nội vụ.',
    speaker: {
      name: 'Huy',
      role: 'Bạn cùng phòng',
      avatarId: 'huy',
      mood: 'smile',
    },
    dialogue: 'Cậu phơi đúng dây nhé, hôm qua phòng bên bị thầy phạt vì phơi lẫn tất với quân phục đấy!',
    backgroundType: 'wash',
    choices: [
      {
        id: 'a_sp_c1',
        text: 'Phơi chuẩn chỉ từ cửa nhìn ra: Dây 1 (đồ lót, tất), Dây 2 (thường phục, khăn tắm), Dây 3 (khăn mặt, quân phục)',
        attributeEffects: { health: 1, morale: 4, reputation: 8, money: 0 },
        tipRewardId: 'tip_phan_loai_3_day_phoi',
        inventoryRewardId: 'moc_treo_quan_ao',
        outcomeText: 'Sân phơi ngăn nắp thẳng tắp, được cộng điểm thi đua tập thể trong đợt kiểm tra chiều!',
      },
      {
        id: 'a_sp_c2',
        text: 'Tiện tay vắt quần áo ướt lên chấn song sắt cửa sổ và ô thoáng cho nhanh khô',
        attributeEffects: { health: 0, morale: -3, reputation: -8, money: 0 },
        outcomeText: 'Mất mỹ quan doanh trại nghiêm trọng, bị đại đội trưởng chụp ảnh nhắc nhở trong buổi giao ban tối.',
      },
      {
        id: 'a_sp_c3',
        text: 'Dùng kẹp nhựa kẹp chặt từng móc áo vào dây thép tránh gió đồi thổi dồn vào nhau',
        attributeEffects: { health: 0, morale: 4, reputation: 6, money: 0 },
        outcomeText: 'Đồ phơi thông thoáng, đón trọn gió và nắng chiều mau khô mà không sợ bị bay mất.',
      },
    ],
  },
  {
    id: 'a_binh_nong_lanh',
    phase: 'afternoon',
    phaseLabel: 'Chiều',
    category: 'An toàn & Sinh hoạt',
    topic: 'water_heater',
    title: 'Tắm nước nóng an toàn sau ngày mưa lạnh',
    narrative: 'Mưa phùn khiến thời tiết se lạnh, các bạn đi học về đều háo hức muốn vào tắm nước nóng.',
    speaker: {
      name: 'Linh',
      role: 'Bạn học',
      avatarId: 'linh',
      mood: 'normal',
    },
    dialogue: 'Bật bình nóng lạnh nhớ canh giờ nhé, lúc tắm nhớ gạt aptomat xuống kẻo nguy hiểm!',
    backgroundType: 'wash',
    choices: [
      {
        id: 'a_bnl_c1',
        text: 'Bật bình nóng lạnh 15 phút, sau đó bắt buộc gạt aptomat tắt hẳn trước khi bước vào tắm',
        attributeEffects: { health: 6, morale: 5, reputation: 5, money: 0 },
        tipRewardId: 'tip_xu_ly_aptomat_nong_lanh',
        outcomeText: 'Làn nước ấm nóng xua tan giá lạnh an toàn tuyệt đối. Cả phòng yên tâm sinh hoạt.',
      },
      {
        id: 'a_bnl_c2',
        text: 'Vừa bật bình vừa xả vòi sen tắm cho nước luôn nóng bỏng',
        attributeEffects: { health: 2, morale: -4, reputation: -6, money: 0 },
        outcomeText: 'Bị bạn cùng phòng nhắc nhở nghiêm khắc vì vi phạm quy tắc an toàn điện tính mạng tập thể.',
      },
      {
        id: 'a_bnl_c3',
        text: 'Bật bình chung cho cả phòng tắm luân phiên, hẹn giờ chuông báo đúng 20 phút là tắt nguồn',
        attributeEffects: { health: 5, morale: 6, reputation: 7, money: 0 },
        outcomeText: 'Kế hoạch sử dụng nước nóng khoa học và tiết kiệm điện, ai cũng được tắm nước ấm an toàn.',
      },
    ],
  },
  {
    id: 'a_tra_sua_cong_sau',
    phase: 'afternoon',
    phaseLabel: 'Chiều',
    category: 'Kỷ luật & Ăn uống',
    topic: 'outside_food',
    title: 'Cám dỗ trà sữa gà rán qua hàng rào cổng sau',
    narrative: 'Chiều muộn, mấy bạn phòng bên rủ nhau mua trà sữa và gà rán từ bên ngoài, bảo shipper giao qua khe hàng rào cổng sau Hola.',
    speaker: {
      name: 'Minh',
      role: 'Bạn cùng phòng',
      avatarId: 'minh',
      mood: 'laugh',
    },
    dialogue: 'Thèm trà sữa trân châu quá! Góp tiền làm một ly ship cổng sau không cậu?',
    backgroundType: 'courtyard',
    choices: [
      {
        id: 'a_ts_c1',
        text: 'Kiên quyết từ chối và nhắc các bạn về điều cấm số 1 của Trung tâm: không mua bán qua hàng rào',
        attributeEffects: { health: 2, morale: 4, reputation: 8, money: 0 },
        tipRewardId: 'tip_khong_mua_ban_qua_hang_rao',
        outcomeText: 'Sự kiên định và hiểu luật của bạn giúp cả nhóm tránh khỏi một vụ bắt quả tang kỷ luật nặng!',
      },
      {
        id: 'a_ts_c2',
        text: 'Góp 30.000đ mua một ly trà sữa trân châu full-topping uống giải khát',
        attributeEffects: { health: -15, morale: -5, reputation: -10, money: -30000 },
        outcomeText: 'Vừa nhận đồ qua rào thì bị Đội cờ đỏ tuần tra phát hiện! Bị lập biên bản kỷ luật và đau bụng vì đồ ăn không rõ nguồn gốc.',
      },
      {
        id: 'a_ts_c3',
        text: 'Rủ các bạn vào căng-tin chính thức mua hoa quả và sữa chua sạch ăn cho lành mạnh',
        attributeEffects: { health: 4, morale: 5, reputation: 6, money: -15000 },
        outcomeText: 'Vừa thỏa mãn cơn thèm ăn vặt vừa an toàn vệ sinh, không hề vi phạm quy định trung tâm.',
      },
    ],
  },
  {
    id: 'a_ngu_gat_tiet_chieu',
    phase: 'afternoon',
    phaseLabel: 'Chiều',
    category: 'Học tập & Tác phong',
    topic: 'study',
    title: '14:15 tiết học Đường lối Quốc phòng An ninh',
    narrative: '14:15 chiều, tiết học về Đường lối Quốc phòng An ninh diễn ra êm đềm, tiếng quạt trần quay đều đều ru ngủ cả giảng đường.',
    speaker: {
      name: 'Giảng viên',
      role: 'Thầy giáo giảng đường',
      avatarId: 'commander',
      mood: 'normal',
    },
    dialogue: 'Các đồng chí chú ý sơ đồ tư duy trên bảng, phần này chắc chắn sẽ có trong đề thi kết thúc học phần!',
    backgroundType: 'lecture',
    choices: [
      {
        id: 'a_ng_c1',
        text: 'Tỉnh táo tiếp thu kiến thức, tích cực ghi chép sơ đồ từ khóa chất lượng để ôn thi',
        attributeEffects: { health: 0, morale: 6, reputation: 6, money: 0 },
        tipRewardId: 'tip_tap_trung_nghe_giang_chieu',
        inventoryRewardId: 'but_bi',
        outcomeText: 'Những dòng ghi chú khoa học giúp bạn nắm chắc kiến thức mà không tốn công học vẹt khi thi.',
      },
      {
        id: 'a_ng_c2',
        text: 'Chống tay lên cằm, gù gật ngủ vì nghĩ chợp mắt một tí không sao',
        attributeEffects: { health: 1, morale: -4, reputation: -6, money: 0 },
        outcomeText: 'Bị thầy gọi đứng dậy trả lời câu hỏi trước 200 sinh viên, ngượng ngùng đỏ bừng cả mặt!',
      },
      {
        id: 'a_ng_c3',
        text: 'Lấy bình nước hớp một ngụm nhỏ và dùng khăn ướt lau khóe mắt cho tỉnh táo',
        attributeEffects: { health: 1, morale: 4, reputation: 5, money: 0 },
        outcomeText: 'Cơn buồn ngủ tan biến tức thì, bạn tiếp tục tập trung theo dõi bài giảng quan trọng.',
      },
    ],
  },
  {
    id: 'a_chup_anh_giai_lao',
    phase: 'afternoon',
    phaseLabel: 'Chiều',
    category: 'Kỷ luật & Tác phong',
    topic: 'media',
    title: 'Chụp ảnh tư liệu đời sống quân ngũ',
    narrative: 'Nhân giờ giải lao 15 phút trên lớp, nhóm bạn muốn sản xuất bộ ảnh tư liệu về đời sống tân binh tại Hola.',
    speaker: {
      name: 'Huy',
      role: 'Cây hài phòng',
      avatarId: 'huy',
      mood: 'laugh',
    },
    dialogue: 'Hay là lén chụp dìm dáng ngủ của thầy giáo đăng story câu like cho vui đi cậu?',
    backgroundType: 'lecture',
    choices: [
      {
        id: 'a_ca_c1',
        text: 'Xin phép chụp vài bức ảnh tư liệu học tập nghiêm túc, tôn trọng hình ảnh thầy cô',
        attributeEffects: { health: 0, morale: 6, reputation: 6, money: 0 },
        tipRewardId: 'tip_chup_anh_tu_lieu_dung_muc',
        outcomeText: 'Bộ ảnh học tập nghiêm trang, đẹp đẽ được chia sẻ lên trang tin sinh viên với nhiều lời khen ngợi.',
      },
      {
        id: 'a_ca_c2',
        text: 'Lén lút chụp ảnh dìm Thầy lúc đang giảng bài để đăng story "câu like"',
        attributeEffects: { health: 0, morale: -10, reputation: -15, money: 0 },
        outcomeText: 'Bị phát hiện và lập biên bản xử lý kỷ luật nghiêm khắc vì vi phạm quy định bảo mật hình ảnh và tôn sư trọng đạo!',
      },
      {
        id: 'a_ca_c3',
        text: 'Rủ cả nhóm cùng chụp ảnh tập thể quân phục rằn ri trước cổng nhà hiệu bộ lưu giữ kỷ niệm đẹp',
        attributeEffects: { health: 0, morale: 7, reputation: 5, money: 0 },
        outcomeText: 'Bức ảnh kỷ niệm tuyệt đẹp với nụ cười rạng rỡ của cả nhóm trong màu áo lính.',
      },
    ],
  },
  {
    id: 'a_binh_tong_khat_nuoc',
    phase: 'afternoon',
    phaseLabel: 'Chiều',
    category: 'Sức khỏe & Huấn luyện',
    topic: 'hydration',
    title: 'Cổ họng khô rát sau 3 tiết học chiến thuật',
    narrative: 'Kết thúc 3 tiết học chiến thuật ngoài bãi tập, cổ họng khô rát, bình tông nước đeo bên hông nặng trĩu mát rượi.',
    speaker: {
      name: 'Minh',
      role: 'Bạn cùng phòng',
      avatarId: 'minh',
      mood: 'worried',
    },
    dialogue: 'Khát cháy họng rồi! Tu một hơi hết nửa bình cho đã đời nào!',
    backgroundType: 'outdoor',
    choices: [
      {
        id: 'a_bt_c1',
        text: 'Mở nắp bình tông, nhấp từng ngụm nhỏ, súc miệng rồi nuốt từ từ',
        attributeEffects: { health: 6, morale: 4, reputation: 2, money: 0 },
        tipRewardId: 'tip_uong_nuoc_am_chia_nho',
        outcomeText: 'Cơ thể hấp thu nước êm dịu, không hề bị tức ngực hay đau bụng.',
      },
      {
        id: 'a_bt_c2',
        text: 'Tu ừng ực hết sạch nửa bình nước lạnh trong khi đang thở dốc',
        attributeEffects: { health: -6, morale: -3, reputation: 0, money: 0 },
        outcomeText: 'Bị nấc cụt liên hồi và tức bụng suốt nửa tiếng sau đó, đi lại rất nặng nề khó chịu.',
      },
      {
        id: 'a_bt_c3',
        text: 'Nghỉ ngơi thả lỏng 2 phút cho nhịp thở ổn định rồi mới mở bình uống từng ngụm nhỏ',
        attributeEffects: { health: 5, morale: 5, reputation: 3, money: 0 },
        outcomeText: 'Cơ thể hồi phục thể lực nhanh chóng, nhịp tim trở lại bình thường êm ái.',
      },
    ],
  },
  {
    id: 'a_lan_le_quan_phuc_bun',
    phase: 'afternoon',
    phaseLabel: 'Chiều',
    category: 'Vệ sinh & Kỷ luật',
    topic: 'tactics',
    title: 'Quân phục lấm lem bùn đất sau giờ trườn bò',
    narrative: 'Lăn lê bò toài ngoài bãi đất đỏ, quần áo dính đầy bùn đất mà quân trang chỉ có 2 bộ luân phiên.',
    speaker: {
      name: 'An',
      role: 'Lớp phó',
      avatarId: 'an',
      mood: 'normal',
    },
    dialogue: 'Giặt ngay đi cậu, đất đỏ khô cứng lại là hôm sau ngứa ngáy không chịu nổi đâu!',
    backgroundType: 'wash',
    choices: [
      {
        id: 'a_ll_c1',
        text: 'Về phòng giặt ngay và vắt thật kiệt phơi lên dây số 3 để kịp khô cho sáng mai',
        attributeEffects: { health: 4, morale: 4, reputation: 10, money: 0 },
        tipRewardId: 'tip_giat_quan_ao_ngay_khi_tam',
        inventoryRewardId: 'bot_giat_goi_nho',
        outcomeText: 'Hôm sau bạn có bộ đồ sạch thơm tho để mặc, được bạn bè khen ngợi tác phong sạch sẽ.',
      },
      {
        id: 'a_ll_c2',
        text: 'Lười giặt, treo tạm lên móc định bụng mặc lại ngày mai cho đỡ bẩn đồ mới',
        attributeEffects: { health: -15, morale: -8, reputation: -8, money: 0 },
        outcomeText: 'Mùi mồ hôi và bùn đất bốc lên khiến cả phòng biểu tình, hôm sau mặc vào da bị mẩn ngứa khó chịu!',
      },
      {
        id: 'a_ll_c3',
        text: 'Ngâm xà phòng 15 phút rồi rủ bạn cùng phòng giặt chung một mẻ vắt kiệt',
        attributeEffects: { health: 3, morale: 6, reputation: 8, money: 0 },
        outcomeText: 'Vết bùn đất biến mất sạch bóng, tinh thần đồng đội giặt giũ vui vẻ rôm rả.',
      },
    ],
  },
  {
    id: 'a_sjc_xit_chong_nang',
    phase: 'afternoon',
    phaseLabel: 'Chiều',
    category: 'sjc_item_event',
    topic: 'sjc_sunscreen',
    title: '[CHIỀU] Nắng rát thao trường & Xịt chống nắng SJC',
    narrative: '13:45 chiều, trung đội tập trung ra bãi tập ngoài trời. Nắng rát như đổ lửa, bạn cùng phòng nhăn nhó lo bị rát da, cháy nắng.',
    speaker: {
      name: 'Linh',
      role: 'Bạn học',
      avatarId: 'linh',
      mood: 'worried',
    },
    dialogue: 'Nắng gắt 38 độ thế này tập bắn súng ngoài bãi là cháy đen sạm da mất, rát buốt quá cậu ơi!',
    backgroundType: 'outdoor',
    isSjc: true,
    sjcBadge: '[ĐẶC QUYỀN SJC]',
    choices: [
      {
        id: 'a_sjc_xcn_c1',
        text: 'Lấy chai Xịt chống nắng SJC xịt một lớp sương bảo vệ mát rượi lên mặt, cổ và chia sẻ xịt cho cả bạn cùng hàng',
        attributeEffects: { health: 3, morale: 6, reputation: 8, money: 0 },
        tipRewardId: 'tip_chong_say_nang_thao_truong',
        inventoryRewardId: 'sjc_xit_chong_nang',
        outcomeText: 'Lớp sương chống nắng SPF 50 tạo màng chắn làm mát dịu làn da tức thì, đồng đội trầm trồ cảm kích sự chu đáo chuẩn phong cách sinh viên Báo chí!',
      },
      {
        id: 'a_sjc_xcn_c2',
        text: 'Phơi trần mặt và cánh tay dưới cái nắng 38 độ của đồi Hòa Lạc suốt 3 tiếng buổi chiều',
        attributeEffects: { health: -12, morale: -6, reputation: 0, money: 0 },
        outcomeText: 'Da mặt và gáy bị cháy nắng đỏ rát phồng rộp, tối về tắm nước rát buốt không ngủ nổi!',
      },
      {
        id: 'a_sjc_xcn_c3',
        text: 'Dùng khăn mặt che tạm lên gáy và kéo thấp vành mũ cối để trốn bớt ánh nắng gay gắt',
        attributeEffects: { health: -4, morale: -2, reputation: 1, money: 0 },
        outcomeText: 'Hạn chế được một phần nắng chiếu vào gáy nhưng mồ hôi ứ đọng lại dưới khăn gây ngứa ngáy bức bối.',
      },
    ],
  },
  {
    id: 'a_sjc_binh_giu_nhiet',
    phase: 'afternoon',
    phaseLabel: 'Chiều',
    category: 'sjc_item_event',
    topic: 'sjc_thermos',
    title: '[CHIỀU] Thao trường khát cháy & Bình giữ nhiệt SJC',
    narrative: '15:30 ngoài bãi huấn luyện bắn súng, cái nóng như thiêu như đốt khiến ai nấy đều cạn kiệt năng lượng và khát khô cổ họng.',
    speaker: {
      name: 'Huy',
      role: 'Bạn cùng phòng',
      avatarId: 'huy',
      mood: 'worried',
    },
    dialogue: 'Cổ họng tớ khô khốc rát bỏng rồi, bình tông nước quân nhu đã hết veo từ lúc nào...',
    backgroundType: 'outdoor',
    isSjc: true,
    sjcBadge: '[ĐẶC QUYỀN SJC]',
    choices: [
      {
        id: 'a_sjc_bgn_c1',
        text: 'Mở chiếc Bình giữ nhiệt SJC rót ngụm nước mát lạnh sảng khoái và chia sẻ một phần cho đồng đội đang lả đi vì khát',
        attributeEffects: { health: 5, morale: 7, reputation: 8, money: 0 },
        tipRewardId: 'tip_uong_nuoc_am_chia_nho',
        inventoryRewardId: 'sjc_binh_giu_nhiet',
        outcomeText: 'Dòng nước mát lạnh giữ nhiệt hoàn hảo như nguồn suối hồi sinh thể lực, bạn và các đồng chí lấy lại năng lượng hoàn thành xuất sắc bài ngắm bắn!',
      },
      {
        id: 'a_sjc_bgn_c2',
        text: 'Uống vội nước đọng từ vòi công cộng chưa qua đun sôi lọc sạch ở rìa bãi tập',
        attributeEffects: { health: -10, morale: -4, reputation: -2, money: 0 },
        outcomeText: 'Nước lã nhiễm khuẩn làm bụng bạn quặn thắt dữ dội, phải xin phép ra trạm y tế nằm nghỉ!',
      },
      {
        id: 'a_sjc_bgn_c3',
        text: 'Cắn răng chịu đựng cơn khát, cố gắng nuốt nước bọt và chờ hết giờ tập mới về phòng',
        attributeEffects: { health: -5, morale: -3, reputation: 1, money: 0 },
        outcomeText: 'Cổ họng khô rát, bước chân nặng trĩu nhưng sự kiên cường giúp bạn trụ vững tới khi tiếng còi giải tán vang lên.',
      },
    ],
  },
  {
    id: 'a_sjc_khan_lanh',
    phase: 'afternoon',
    phaseLabel: 'Chiều',
    category: 'sjc_item_event',
    topic: 'sjc_cold_towel',
    title: '[CHIỀU] Hạ nhiệt khẩn cấp sau bài chạy & Khăn lạnh SJC',
    narrative: 'Hoàn thành bài chạy vũ trang 1500m quanh đồi, mồ hôi nhễ nhại, tim đập thình thịch, hơi nóng bốc lên ngùn ngụt khắp người.',
    speaker: {
      name: 'Minh',
      role: 'Bạn cùng phòng',
      avatarId: 'minh',
      mood: 'worried',
    },
    dialogue: 'Thở không ra hơi rồi cậu ơi! Tim tớ đập như đánh trống, người nóng bừng như lò than!',
    backgroundType: 'outdoor',
    isSjc: true,
    sjcBadge: '[ĐẶC QUYỀN SJC]',
    choices: [
      {
        id: 'a_sjc_kl_c1',
        text: 'Lấy chiếc Khăn lạnh SJC đắp lên trán và sau gáy, giúp hạ thân nhiệt tức thì, xua tan cảm giác say nắng',
        attributeEffects: { health: 6, morale: 8, reputation: 4, money: 0 },
        tipRewardId: 'tip_an_sang_du_nang_luong',
        inventoryRewardId: 'sjc_khan_lanh',
        outcomeText: 'Cảm giác mát lạnh sảng khoái lan tỏa khắp các dây thần kinh, điều hòa thân nhiệt an toàn và đẩy lùi nguy cơ sốc nhiệt!',
      },
      {
        id: 'a_sjc_kl_c2',
        text: 'Đứng thẳng trước luồng gió quạt công suất lớn đang thốc ngược để hong khô mồ hôi',
        attributeEffects: { health: -8, morale: -3, reputation: -1, money: 0 },
        outcomeText: 'Gió thốc đột ngột khi lỗ chân lông đang giãn nở khiến bạn bị trúng gió, cảm lạnh và đau đầu dữ dội.',
      },
      {
        id: 'a_sjc_kl_c3',
        text: 'Dùng vạt áo quân phục lau vội mồ hôi rồi ngồi bệt xuống nền đất cát thở dốc',
        attributeEffects: { health: -2, morale: 1, reputation: 0, money: 0 },
        outcomeText: 'Cơ thể hạ nhiệt dần nhưng áo ướt sũng dính chặt vào lưng đất cát gây dính nhớp khó chịu.',
      },
    ],
  },
];

export const EVENING_SITUATIONS: StoryEvent[] = [
  {
    id: 'e_tap_trung_muon_2030',
    phase: 'evening',
    phaseLabel: 'Tối',
    category: 'Kỷ luật & Điểm danh',
    topic: 'late_assembly_2030',
    title: '[TỐI 20:30] Đại đội tập trung muộn & Thầy đại đội trưởng nổi giận',
    narrative: '20:30 là giờ tập trung sinh hoạt đại đội tại sân chung. Một số phòng lề mề đi vệ sinh và nộp điện thoại muộn khiến cả đại đội xếp hàng nhấp nhô, trễ mất 10 phút. Thầy đại đội trưởng mặt đanh lại, nổi giận chấn chỉnh tác phong kỷ luật thép!',
    speaker: {
      name: 'Thầy Đại đội trưởng',
      role: 'Chỉ huy Đại đội',
      avatarId: 'commander',
      mood: 'stern',
    },
    dialogue: 'Các đồng chí coi kỷ luật quân đội là trò đùa à?! 20:30 tập trung mà 20:40 hàng ngũ vẫn nhấp nhô, thì thào nói chuyện riêng! Toàn đại đội đứng nghiêm 15 phút uốn nắn tác phong!',
    backgroundType: 'courtyard',
    choices: [
      {
        id: 'e_ttm_c1',
        text: 'Đứng nghiêm chuẩn chỉ, hai gót chân khép chặt, mắt nhìn thẳng, tự giác chấp hành và giữ bình tĩnh cho cả hàng quân',
        attributeEffects: { reputation: 8, morale: 2, health: -1, money: 0 },
        tipRewardId: 'tip_chap_hanh_lenh_truc_ban',
        outcomeText: 'Tác phong nghiêm túc của bạn lan tỏa sang các đồng chí bên cạnh, hàng ngũ nhanh chóng ngay ngắn thẳng tắp, thầy chỉ huy dịu giọng hạ lệnh cho nghỉ.',
      },
      {
        id: 'e_ttm_c2',
        text: 'Đứng rung đùi, lấm lét liếc nhìn xung quanh rồi lẩm bẩm càu nhàu đổ lỗi cho các phòng bên cạnh làm trễ',
        attributeEffects: { reputation: -10, morale: -6, health: -2, money: 0 },
        outcomeText: 'Ánh mắt nghiêm khắc của thầy chỉ huy quét trúng bạn! Bạn bị nêu tên phê bình trước toàn thể đại đội vì thiếu ý thức tự giác tập thể.',
      },
      {
        id: 'e_ttm_c3',
        text: 'Chủ động dùng khẩu lệnh nhỏ nhắc nhở các bạn trong tiểu đội khẩn trương vào đúng cự ly hàng ngũ, giữ trật tự tuyệt đối',
        attributeEffects: { reputation: 10, morale: 5, health: 0, money: 0 },
        tipRewardId: 'tip_ky_luat_tu_giac_tap_the',
        outcomeText: 'Tiểu đội của bạn là đơn vị đầu tiên ổn định hàng ngũ chuẩn xác, được thầy ghi nhận tinh thần trách nhiệm đồng đội.',
      },
    ],
  },
  {
    id: 'night_guard_duty',
    phase: 'evening',
    phaseLabel: 'Tối',
    category: 'military_duty',
    topic: 'night_guard',
    title: 'Ca gác đêm 01:00 sáng & Duy trì an ninh doanh trại',
    narrative: 'Đến ca trực lúc 01:00 sáng (gác cầu thang trong nhà đối với Nữ / gác cổng doanh trại đối với Nam), không gian đêm hè yên ắng và cơn buồn ngủ ập đến dồn dập cùng bạn gác chung.',
    speaker: {
      name: 'Bạn gác chung',
      role: 'Đồng đội trực gác',
      avatarId: 'roommate',
      mood: 'worried',
    },
    dialogue: 'Mắt cứ díp lại bạn ơi! Đêm hè yên tĩnh thế này rất dễ ngủ gật, chúng mình phải cố bấm tay đi lại giữ tỉnh táo nhé!',
    backgroundType: 'evening_campus',
    choices: [
      {
        id: 'ngd_c1',
        text: 'Đứng đúng vị trí, trang phục chỉnh tề, bấm ngón tay đi lại tuần tra giữ tỉnh táo cùng bạn gác chung',
        attributeEffects: { reputation: 10, morale: 4, health: -3 },
        tipRewardId: 'tip_chap_hanh_lenh_truc_ban',
        outcomeText: 'Ý chí kiên định và tác phong nghiêm túc giúp ca gác hoàn thành xuất sắc, được chỉ huy đi tuần kiểm tra biểu dương!',
      },
      {
        id: 'ngd_c2',
        text: 'Ngồi thụp vào góc khuất lấy điện thoại ra lướt mạng chống buồn ngủ',
        attributeEffects: { reputation: -12, morale: -4, health: -2 },
        outcomeText: 'Cán bộ đi kiểm tra đột xuất phát hiện ánh sáng màn hình điện thoại trong bóng tối, lập biên bản trừ điểm thi đua!',
      },
      {
        id: 'ngd_c3',
        text: 'Rủ bạn trực cùng thay phiên nhau: một người chợp mắt 20 phút rồi đổi lượt',
        attributeEffects: { reputation: -8, health: 2, morale: -2 },
        outcomeText: 'Cả hai đều ngủ quên và giật mình tỉnh dậy khi trời gần sáng, may mắn không có sự cố nhưng canh cánh nỗi lo bị phát hiện.',
      },
    ],
  },
  {
    id: 'e_nop_dien_thoai_2020',
    phase: 'evening',
    phaseLabel: 'Tối',
    category: 'Kỷ luật & Đồ dùng',
    topic: 'phone',
    title: '20:20 giờ nộp điện thoại toàn đại đội',
    narrative: '20:20 là giờ nộp điện thoại. Chiếc điện thoại rung lên vì video TikTok "Hola ngày đầu" của bạn đang tăng view ầm ầm và có hàng trăm bình luận chờ trả lời.',
    speaker: {
      name: 'Minh',
      role: 'Trưởng phòng thu máy',
      avatarId: 'minh',
      mood: 'normal',
    },
    dialogue: 'Đến giờ nộp máy rồi cả phòng ơi, tắt nguồn rồi bỏ vào giỏ cho tớ mang nộp nhé!',
    backgroundType: 'dorm',
    choices: [
      {
        id: 'e_ndt_c1',
        text: 'Tắt nguồn, nộp điện thoại cho trưởng phòng, xuống sân tập trung rồi ngủ lấy sức cho ngày mai',
        attributeEffects: { health: 8, morale: 3, reputation: 6, money: 0 },
        tipRewardId: 'tip_nop_dien_thoai_dung_gio',
        outcomeText: 'Giấc ngủ sâu không bị ánh sáng xanh quấy rầy giúp bạn tràn đầy sinh lực vào sáng hôm sau.',
      },
      {
        id: 'e_ndt_c2',
        text: 'Lén giấu điện thoại 1 đêm, trùm chăn kín đầu bật độ sáng thấp nhất để rep comment và cày view',
        attributeEffects: { health: -8, morale: -5, reputation: -15, money: 0 },
        outcomeText: 'Ánh sáng le lói qua chăn bị chỉ huy đi kiểm tra đêm bắt quả tang! Bị tịch thu máy và viết bản kiểm điểm trước đại đội.',
      },
      {
        id: 'e_ndt_c3',
        text: 'Nhắn nhanh 1 câu thông báo cho gia đình rồi tắt nguồn chủ động nộp đúng giờ',
        attributeEffects: { health: 6, morale: 5, reputation: 6, money: 0 },
        outcomeText: 'Gia đình an tâm, bản thân tuân thủ tuyệt đối quy định kỷ luật quân sự.',
      },
    ],
  },
  {
    id: 'e_truc_gac_dem',
    phase: 'evening',
    phaseLabel: 'Tối',
    category: 'Kỷ luật & Trực ban',
    topic: 'guard',
    title: 'Phiên gác đêm từ 21h30 đến 23h',
    narrative: 'Đến phiên bạn trực ca đêm tại sảnh D2, thời gian từ 21h30 đến 23h00. Không gian tĩnh mịch, gió đồi thổi lành lạnh.',
    speaker: {
      name: 'Cán bộ trực ban',
      role: 'Chỉ huy kiểm tra gác',
      avatarId: 'commander',
      mood: 'stern',
    },
    dialogue: 'Tác phong canh gác của đồng chí phải luôn cảnh giác cao độ, ghi chép sổ trực ban đầy đủ!',
    backgroundType: 'evening_campus',
    choices: [
      {
        id: 'e_tg_c1',
        text: 'Mang trang phục chỉnh tề (quân phục, đi giày), đứng gác nghiêm túc tại sảnh và ghi chép sổ trực',
        attributeEffects: { health: -1, morale: 4, reputation: 12, money: 0 },
        tipRewardId: 'tip_chap_hanh_lenh_truc_ban',
        inventoryRewardId: 'thuoc_xit_con_trung',
        outcomeText: 'Tác phong đĩnh đạc và tinh thần trách nhiệm cao của bạn được cán bộ trực ban biểu dương trong sổ giao ban!',
      },
      {
        id: 'e_tg_c2',
        text: 'Trốn vào góc cầu thang bấm điện thoại và ngủ gật vì nghĩ đêm muộn không ai kiểm tra',
        attributeEffects: { health: -2, morale: -8, reputation: -15, money: 0 },
        outcomeText: 'Bị chỉ huy đi tuần bắt quả tang ngủ gật trong ca trực, bị phạt đứng gác tăng cường ca 2h sáng hôm sau!',
      },
      {
        id: 'e_tg_c3',
        text: 'Mặc áo ấm, đi tuần tra nhẹ nhàng quanh hành lang tầng 1 và bàn giao ca gác đúng giờ',
        attributeEffects: { health: 0, morale: 5, reputation: 10, money: 0 },
        outcomeText: 'Doanh trại an toàn tuyệt đối suốt phiên trực, ca gác sau gửi lời cảm ơn bạn vì sự chu đáo.',
      },
    ],
  },
  {
    id: 'e_chuyen_ma_hola_tat_den',
    phase: 'evening',
    phaseLabel: 'Tối',
    category: 'Sinh hoạt & Tình cảm',
    topic: 'bedtime_story',
    title: '[TỐI] 22:00 Giờ tắt đèn và truyền thuyết đêm Hòa Lạc',
    narrative: 'Kẻng tắt đèn vang lên, bóng tối bao trùm 14 chiếc giường sắt. Giọng kể chuyện thì thầm về những câu chuyện đêm Hòa Lạc khiến cả phòng vừa sợ vừa buồn cười.',
    speaker: {
      name: 'Huy',
      role: 'Cây hài phòng',
      avatarId: 'huy',
      mood: 'laugh',
    },
    dialogue: 'Suỵt! Nghe nói đêm nào ở sân bóng rổ cũng có tiếng đập bóng tưng tưng đấy... Ai dám ra xem không?',
    backgroundType: 'dorm',
    choices: [
      {
        id: 'e_cmh_c1',
        text: 'Cười đùa tiếp lời vui vẻ vài câu rồi nghiêm túc nhắc cả phòng ngủ sớm lấy sức cho 5h30 sáng mai',
        attributeEffects: { health: 4, morale: 6, reputation: 5, money: 0 },
        tipRewardId: 'tip_tat_den_dung_gio',
        outcomeText: 'Không khí ấm cúng gắn kết cả phòng, mọi người nhanh chóng chìm vào giấc ngủ sâu an lành.',
      },
      {
        id: 'e_cmh_c2',
        text: 'Bày trò gõ cửa, đập giường dọa các bạn làm cả phòng la hét ầm ĩ',
        attributeEffects: { health: -2, morale: -4, reputation: -10, money: 0 },
        outcomeText: 'Trực ban đại đội dưới tầng 1 nghe tiếng động chạy lên lập biên bản vì làm mất trật tự sau 22h!',
      },
      {
        id: 'e_cmh_c3',
        text: 'Kể một mẩu chuyện hài sinh viên để xua tan bầu không khí rùng rợn rồi chúc cả phòng ngủ ngon',
        attributeEffects: { health: 3, morale: 7, reputation: 6, money: 0 },
        outcomeText: 'Cả phòng cười khúc khích trong chăn rồi yên tâm ngủ say, tinh thần sảng khoái.',
      },
    ],
  },
  {
    id: 'e_viet_nhat_ky_la_thu',
    phase: 'evening',
    phaseLabel: 'Tối',
    category: 'Gia đình & Tâm sự',
    topic: 'journal',
    title: '[TỐI] Viết vài dòng nhật ký gửi người thân dưới ánh đèn hành lang',
    narrative: 'Trước giờ tắt đèn, bạn tranh thủ ngồi bên bàn học ghi lại những cảm xúc bỡ ngỡ và niềm tự hào của những ngày đầu tân binh.',
    speaker: {
      name: 'Minh',
      role: 'Bạn cùng phòng',
      avatarId: 'minh',
      mood: 'smile',
    },
    dialogue: 'Cậu cũng đang viết nhật ký à? Tớ vừa viết thư cho mẹ kể chuyện chiếc chăn gấp vuông vức đấy!',
    backgroundType: 'study',
    choices: [
      {
        id: 'e_vnk_c1',
        text: 'Ghi lại những trải nghiệm đáng nhớ và sự trưởng thành của bản thân sau từng ngày',
        attributeEffects: { health: 1, morale: 7, reputation: 4, money: 0 },
        tipRewardId: 'tip_giu_vung_tinh_than_lac_quan',
        inventoryRewardId: 'so_tay',
        outcomeText: 'Những trang viết lắng đọng giúp bạn thêm yêu quý cuộc sống quân ngũ và tự hào về bản thân.',
      },
      {
        id: 'e_vnk_c2',
        text: 'Gấp sổ lại, vội vàng lên giường nằm lướt mạng xã hội cho hết giờ',
        attributeEffects: { health: 0, morale: 1, reputation: 0, money: 0 },
        outcomeText: 'Bạn trôi qua buổi tối bình lặng, sẵn sàng cho giấc ngủ trước giờ tắt đèn.',
      },
      {
        id: 'e_vnk_c3',
        text: 'Cùng Minh trao đổi vài câu chuyện thú vị trong ngày rồi cùng tắt đèn bàn đi ngủ',
        attributeEffects: { health: 2, morale: 6, reputation: 5, money: 0 },
        outcomeText: 'Tình bạn cùng phòng thêm gắn kết, tâm trạng nhẹ nhõm sau một ngày rèn luyện vất vả.',
      },
    ],
  },
  {
    id: 'e_mi_tom_dem_khuya',
    phase: 'evening',
    phaseLabel: 'Tối',
    category: 'Ăn uống & Sinh hoạt',
    topic: 'late_snack',
    title: '[TỐI] Cơn đói cồn cào lúc 21h15 và bát mì tôm thơm nức',
    narrative: 'Sau ca trực gác ngoài sảnh lộng gió se lạnh, bụng bạn réo lên ùng ục vì đói. Mấy bạn phòng bên đang rủ nhau úp bát mì tôm.',
    speaker: {
      name: 'Huy',
      role: 'Bạn cùng phòng',
      avatarId: 'huy',
      mood: 'smile',
    },
    dialogue: 'Nước sôi đây rồi! Cậu có muốn úp chung bát mì tôm chua cay cho ấm bụng không?',
    backgroundType: 'dorm',
    choices: [
      {
        id: 'e_mt_c1',
        text: 'Ăn một lượng vừa phải, dọn dẹp bát đũa và lau sạch mặt bàn ngay sau khi ăn',
        attributeEffects: { health: 4, morale: 6, reputation: 3, money: -10000 },
        tipRewardId: 'tip_khong_de_thuc_an_thu_hut_chuot',
        outcomeText: 'Bát mì nóng ấm bụng xua tan giá rét. Bàn phòng sạch sẽ không để lại mùi thu hút kiến chuột.',
      },
      {
        id: 'e_mt_c2',
        text: 'Ăn xong để cả tô mì nước thừa trên mặt bàn định bụng mai dọn rồi đi ngủ',
        attributeEffects: { health: -1, morale: -3, reputation: -7, money: -10000 },
        outcomeText: 'Đêm chuột chạy làm đổ tô mì ra giáo trình, sáng hôm sau bị trực ban trừ điểm nặng nề!',
      },
      {
        id: 'e_mt_c3',
        text: 'Chỉ xin húp một thìa nước canh cho ấm bụng rồi uống nước ấm đi ngủ tránh nặng bụng',
        attributeEffects: { health: 3, morale: 4, reputation: 5, money: 0 },
        outcomeText: 'Vừa ấm cổ họng vừa nhẹ bụng, sáng hôm sau dậy sớm không bị ậm ạch khó tiêu.',
      },
    ],
  },
  {
    id: 'e_on_thi_ly_thuyet_dem',
    phase: 'evening',
    phaseLabel: 'Tối',
    category: 'Học tập & Kỷ luật',
    topic: 'exam_prep',
    title: '[TỐI] Ôn tập lý luận quân sự trước giờ điểm danh',
    narrative: 'Chỉ còn ít ngày nữa là đến bài kiểm tra trắc nghiệm lý luận quân sự, nhóm học tập trong phòng mở giáo trình cùng nhau ôn bài.',
    speaker: {
      name: 'An',
      role: 'Lớp phó học tập',
      avatarId: 'an',
      mood: 'smile',
    },
    dialogue: 'Mỗi người đặt 3 câu hỏi trắc nghiệm rồi đố nhau nhé, cách này nhớ bài siêu nhanh luôn!',
    backgroundType: 'study',
    choices: [
      {
        id: 'e_ot_c1',
        text: 'Tích cực tham gia đố vui trắc nghiệm, giải thích cặn kẽ các điều luật quân sự cho bạn bè',
        attributeEffects: { health: 0, morale: 7, reputation: 8, money: 0 },
        tipRewardId: 'tip_tap_trung_nghe_giang_chieu',
        outcomeText: 'Kiến thức được củng cố vững chắc, cả nhóm đều tự tin sẽ đạt điểm giỏi!',
      },
      {
        id: 'e_ot_c2',
        text: 'Ngồi bấm điện thoại lướt mạng, phó mặc bài vở đến đâu thì đến',
        attributeEffects: { health: 0, morale: -3, reputation: -4, money: 0 },
        outcomeText: 'Kiến thức mơ hồ khiến bạn lo lắng bồn chồn trước kỳ thi.',
      },
      {
        id: 'e_ot_c3',
        text: 'Lập bảng sơ đồ tư duy tóm tắt 5 bài học cốt lõi dán lên góc bàn học chung',
        attributeEffects: { health: 0, morale: 6, reputation: 9, money: 0 },
        outcomeText: 'Cả phòng đều khen ngợi sự đóng góp hữu ích của bạn cho việc học tập chung.',
      },
    ],
  },
  {
    id: 'e_sjc_binh_am_dem',
    phase: 'evening',
    phaseLabel: 'Tối',
    category: 'sjc_item_event',
    topic: 'sjc_night_warmth',
    title: '[TỐI] Đêm sương lạnh Hòa Lạc & Nước ấm Bình giữ nhiệt SJC',
    narrative: '21:00 đêm đồi Hòa Lạc gió lạnh rít từng cơn sau buổi sinh hoạt đại đội, cổ họng ngứa ngáy và bạn cùng phòng bị ho vì lạnh.',
    speaker: {
      name: 'Huy',
      role: 'Bạn cùng phòng',
      avatarId: 'huy',
      mood: 'worried',
    },
    dialogue: 'Khụ... khụ... Gió đồi luồn qua khe cửa buốt quá, cổ họng tớ rát bỏng ho không dứt được...',
    backgroundType: 'dorm',
    isSjc: true,
    sjcBadge: '[ĐẶC QUYỀN SJC]',
    choices: [
      {
        id: 'e_sjc_bad_c1',
        text: 'Rót nước ấm từ Bình giữ nhiệt SJC pha một chút mật ong/gừng ấm cho bản thân và mời bạn cùng phòng cùng uống',
        attributeEffects: { health: 6, morale: 8, reputation: 6, money: 0 },
        tipRewardId: 'tip_uong_nuoc_am_chia_nho',
        inventoryRewardId: 'sjc_binh_giu_nhiet',
        outcomeText: 'Hơi ấm ngọt ngào làm dịu êm cổ họng ngay tức khắc, tiếng ho dứt điểm, cả phòng 14 người cảm kích sự chu đáo và ấm áp tình đồng chí của bạn!',
      },
      {
        id: 'e_sjc_bad_c2',
        text: 'Uống thẳng nước lạnh từ chai nhựa để hở trên bàn từ trưa',
        attributeEffects: { health: -6, morale: -3, reputation: 0, money: 0 },
        outcomeText: 'Nước lạnh ngắt làm cổ họng buốt giá, cơn ho kéo dài dai dẳng suốt cả đêm làm bạn mệt mỏi.',
      },
      {
        id: 'e_sjc_bad_c3',
        text: 'Trùm chăn nằm im chịu đựng cơn ho và gió lạnh luồn qua khe cửa sổ',
        attributeEffects: { health: -3, morale: -2, reputation: 0, money: 0 },
        outcomeText: 'Trằn trọc khó ngủ vì lạnh, sáng hôm sau giọng khàn đặc khi hô khẩu lệnh tập thể dục.',
      },
    ],
  },
];

// ============================================================================
// 3. NGÂN HÀNG 6 TÌNH HUỐNG DÙNG ĐỒ SJC (BẮT BUỘC ÍT NHẤT 3 TÌNH HUỐNG / 7 NGÀY)
// ============================================================================

export const SJC_MANDATORY_SITUATIONS: StoryEvent[] = [
  // Tình huống 1: Nhiều đồ & Túi tote thần kỳ SJC (Buổi Sáng)
  {
    id: 'sjc_situation_1_tote',
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'sjc_item_event',
    topic: 'sjc_tote_bag',
    title: '[SÁNG] Nhiều đồ học tập & Túi tote thần kỳ SJC',
    narrative: 'Các buổi đi học, bạn vừa phải mang giáo trình Quốc phòng, sổ tay, bình nước, kem chống nắng, ô. Tay ôm nách tha rất dễ rơi rớt giữa đường.',
    speaker: {
      name: 'Bạn cùng phòng',
      role: 'Đồng đội SJC',
      avatarId: 'roommate',
      mood: 'worried',
    },
    dialogue: 'Sách giáo trình dày cộp lại thêm bình nước với ô, tay ôm lỉnh kỉnh thế này leo dốc đồi kiểu gì cũng rơi mất thôi!',
    backgroundType: 'dorm',
    isSjc: true,
    sjcBadge: '[ĐẶC QUYỀN SJC]',
    choices: [
      {
        id: 'sjc_s1_c1',
        text: 'Nhét tất cả giáo trình, sổ tay và đồ cá nhân gọn gàng vào chiếc Túi tote thần kỳ SJC rồi khoác lên vai',
        attributeEffects: { reputation: 6, morale: 5, health: 2 },
        inventoryRewardId: 'sjc_tui_tote',
        isSjcChoice: true,
        sjcItemName: 'Túi tote thần kỳ SJC',
        sjcItemIcon: '👜',
        outcomeText: 'Chiếc túi tote thần kỳ SJC chịu lực tốt, sức chứa rộng rãi giúp bạn di chuyển thanh thoát, tác phong nhanh gọn mẫu mực!',
      },
      {
        id: 'sjc_s1_c2',
        text: 'Tay ôm chồng sổ sách lỉnh kỉnh vội vã chạy theo đoàn, bị trượt tay rơi đồ và đi chậm so với đại đội',
        attributeEffects: { morale: -4, health: -2, reputation: -3 },
        outcomeText: 'Chồng giáo trình tuột tay rơi tung tóe ra nền đất đỏ, bạn phải dừng lại nhặt và bị trễ hàng ngũ xuất phát.',
      },
      {
        id: 'sjc_s1_c3',
        text: 'Nhét tạm vài cuốn sách vào lưng quần quân phục và nhờ bạn cùng phòng cầm hộ bình nước, vừa đi vừa lo rơi',
        attributeEffects: { morale: -2, reputation: -1, health: 0 },
        outcomeText: 'Cách chữa cháy tạm thời khiến bạn bước đi ngượng ngùng, vừa đi vừa sợ rơi sách xuống đường dốc.',
      },
    ],
  },

  // Tình huống 2: Nắng rát thao trường & Xịt chống nắng SJC (Buổi Chiều)
  {
    id: 'sjc_situation_2_sunscreen',
    phase: 'afternoon',
    phaseLabel: 'Chiều',
    category: 'sjc_item_event',
    topic: 'sjc_sunscreen',
    title: '[CHIỀU] Nắng rát thao trường & Xịt chống nắng SJC',
    narrative: '13:45 chiều, trung đội tập trung ra bãi tập ngoài trời. Nắng rát như đổ lửa, bạn cùng phòng nhăn nhó lo bị rát da, cháy nắng.',
    speaker: {
      name: 'Bạn học',
      role: 'Đồng đội thao trường',
      avatarId: 'roommate',
      mood: 'worried',
    },
    dialogue: 'Nắng đồi chiều nay gắt quá! Mới đứng 10 phút mà hai cánh tay với gáy rát bỏng cả lên rồi...',
    backgroundType: 'outdoor',
    isSjc: true,
    sjcBadge: '[ĐẶC QUYỀN SJC]',
    choices: [
      {
        id: 'sjc_s2_c1',
        text: 'Lấy chai Xịt chống nắng SJC (SPF 50) xịt đều lên mặt, cổ, hai cánh tay và chia sẻ cho các bạn xung quanh',
        attributeEffects: { health: 5, morale: 8, reputation: 6 },
        inventoryRewardId: 'sjc_xit_chong_nang',
        isSjcChoice: true,
        sjcItemName: 'Xịt chống nắng SJC (SPF 50)',
        sjcItemIcon: '🧴',
        outcomeText: 'Lớp sương chống nắng bảo vệ da dịu mát tức thì, sự hào phóng chia sẻ giúp bạn ghi điểm tuyệt đối trong lòng đồng đội!',
      },
      {
        id: 'sjc_s2_c2',
        text: 'Chủ quan phơi mặt trần dưới nắng suốt 3 tiếng rèn luyện ngoài bãi đất đỏ',
        attributeEffects: { health: -12, morale: -6 },
        outcomeText: 'Làn da bị cháy nắng đỏ rực và bỏng rát, tối về phòng bạn bị sốt nhẹ vì say nắng cả buổi chiều.',
      },
      {
        id: 'sjc_s2_c3',
        text: 'Lấy mũ cối che mặt né nắng nhưng bị tiểu đội trưởng đi qua nhắc nhở chỉnh đốn tác phong',
        attributeEffects: { reputation: -5, morale: -3, health: -2 },
        outcomeText: 'Hành động né nắng lộ liễu làm sai điều lệnh đứng nghiêm, bạn bị nhắc nhở nghiêm khắc trước hàng quân.',
      },
    ],
  },

  // Tình huống 3: Nắng đồi Hòa Lạc & Bình giữ nhiệt SJC (Buổi Sáng)
  {
    id: 'sjc_situation_3_thermos',
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'sjc_item_event',
    topic: 'sjc_thermos_morning',
    title: '[SÁNG] Nắng đồi Hòa Lạc & Bình giữ nhiệt SJC',
    narrative: '10:00 sáng, nắng đồi Hòa Lạc bắt đầu gay gắt. Bài tập điều lệnh kéo dài khiến cơ thể mất nước nhanh chóng, cổ họng khô rát.',
    speaker: {
      name: 'Bạn cùng phòng',
      role: 'Đồng đội thao trường',
      avatarId: 'roommate',
      mood: 'worried',
    },
    dialogue: 'Khát cháy cổ họng rồi! Vừa chạy vừa hô khẩu lệnh mệt lả cả người...',
    backgroundType: 'outdoor',
    isSjc: true,
    sjcBadge: '[ĐẶC QUYỀN SJC]',
    choices: [
      {
        id: 'sjc_s3_c1',
        text: 'Rút chiếc Bình giữ nhiệt SJC đã pha sẵn nước mát từ sáng ra nhấp từng ngụm nhỏ sảng khoái',
        attributeEffects: { health: 8, morale: 6, reputation: 4 },
        inventoryRewardId: 'sjc_binh_giu_nhiet',
        isSjcChoice: true,
        sjcItemName: 'Bình giữ nhiệt SJC',
        sjcItemIcon: '🥤',
        outcomeText: 'Nước mát lạnh giữ nhiệt hoàn hảo giúp hạ nhiệt cơ thể an toàn, tinh thần sảng khoái lấy lại phong độ xuất sắc!',
      },
      {
        id: 'sjc_s3_c2',
        text: 'Không mang theo nước, cố bấm bụng chịu khát đến khi hết tiết học',
        attributeEffects: { health: -10, morale: -5 },
        outcomeText: 'Mất nước trầm trọng khiến bạn hoa mắt chóng mặt, cuối buổi tập phải nhờ đồng đội dìu về phòng.',
      },
      {
        id: 'sjc_s3_c3',
        text: 'Chạy vội sang mượn bình nước của bạn bên cạnh nhưng bình của bạn cũng đã cạn đáy',
        attributeEffects: { health: -4, morale: -2, reputation: -1 },
        outcomeText: 'Cả hai cùng ngậm ngùi chịu khát, bài học nhớ đời về việc tự giác chuẩn bị nước trước khi ra thao trường.',
      },
    ],
  },

  // Tình huống 4: Kiểm tra nội vụ bất ngờ & Túi tote thần kỳ SJC (Buổi Sáng)
  {
    id: 'sjc_situation_4_inspection_tote',
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'sjc_item_event',
    topic: 'sjc_tote_inspection',
    title: '[SÁNG] Kiểm tra nội vụ bất ngờ & Túi tote thần kỳ SJC',
    narrative: '07:00 sáng, tiểu đội nhận thông báo chuẩn bị kiểm tra nội vụ đột xuất trước giờ lên lớp. Nhiều sách vở, đồ dùng cá nhân trên phản giường chưa kịp cất giấu theo quy chuẩn.',
    speaker: {
      name: 'Trực ban phòng',
      role: 'Cán bộ kiểm tra',
      avatarId: 'roommate',
      mood: 'worried',
    },
    dialogue: 'Các bạn ơi nhanh tay lên! Trực ban chuẩn bị gõ cửa chấm điểm rồi, trên giường không được để đồ linh tinh đâu!',
    backgroundType: 'dorm',
    isSjc: true,
    sjcBadge: '[ĐẶC QUYỀN SJC]',
    choices: [
      {
        id: 'sjc_s4_c1',
        text: 'Gom nhanh toàn bộ sổ sách, tài liệu, đồ lặt vặt vào Túi tote thần kỳ SJC rồi khoác vai mang đi học luôn, giường ngủ sạch tinh tươm',
        attributeEffects: { reputation: 8, morale: 6, health: 2 },
        inventoryRewardId: 'sjc_tui_tote',
        isSjcChoice: true,
        sjcItemName: 'Túi tote thần kỳ SJC',
        sjcItemIcon: '👜',
        outcomeText: 'Phản giường trống trơn đúng quy chuẩn chỉ có chăn gối, trực ban chấm phòng đạt điểm A tối đa!',
      },
      {
        id: 'sjc_s4_c2',
        text: 'Cuống cuồng nhét vội đống tài liệu xuống gầm giường bừa bãi, bị trực ban phát hiện và nhắc nhở',
        attributeEffects: { reputation: -6, morale: -4, health: 0 },
        outcomeText: 'Trực ban cúi xuống soi gầm giường và ghi lỗi đồ đạc lộn xộn vào biên bản chấm thi đua.',
      },
      {
        id: 'sjc_s4_c3',
        text: 'Cố nhét toàn bộ sách vở dày cộp vào góc balô căng phồng làm rơi tung tóe ra sàn nhà',
        attributeEffects: { reputation: -3, morale: -3, health: -1 },
        outcomeText: 'Sách rơi làm bẩn bìa, bạn vừa mất công nhặt vừa bị phê bình vì động tác lúng túng mất bình tĩnh.',
      },
    ],
  },

  // Tình huống 5: Giờ tự học buổi tối & Bình giữ nhiệt SJC (Buổi Tối)
  {
    id: 'sjc_situation_5_study_thermos',
    phase: 'evening',
    phaseLabel: 'Tối',
    category: 'sjc_item_event',
    topic: 'sjc_thermos_evening',
    title: '[TỐI] Giờ tự học buổi tối & Bình giữ nhiệt SJC',
    narrative: '19:30 tối, không khí tự học mùa hè oi bức dù 2 chiếc quạt trần quay hết công suất. Cơn buồn ngủ và mệt mỏi sau ngày dài lăn lộn dưới nắng gắt thao trường bắt đầu ập đến trong khi giáo trình quân sự còn nhiều bài ôn tập.',
    speaker: {
      name: 'Bạn học',
      role: 'Bạn tự học',
      avatarId: 'roommate',
      mood: 'worried',
    },
    dialogue: 'Trời oi bức quá, mồ hôi đầm đìa mà mắt cứ díp lại, giáo trình còn tận 2 chương chưa đọc xong...',
    backgroundType: 'study',
    isSjc: true,
    sjcBadge: '[ĐẶC QUYỀN SJC]',
    choices: [
      {
        id: 'sjc_s5_c1',
        text: 'Mở Bình giữ nhiệt SJC đựng nước trà hoa cúc ướp đá mát lạnh sảng khoái mang từ sáng, nhâm nhi từng ngụm mát rượi, đập tan cơn buồn ngủ và tỉnh táo ôn bài cùng cả phòng',
        attributeEffects: { morale: 8, reputation: 5, health: 4 },
        inventoryRewardId: 'sjc_binh_giu_nhiet',
        isSjcChoice: true,
        sjcItemName: 'Bình giữ nhiệt SJC',
        sjcItemIcon: '🥤',
        outcomeText: 'Dòng nước mát lạnh thanh nhiệt xua tan cơn khát và oi ả mùa hè, đầu óc bừng tỉnh giúp bạn và cả phòng hoàn thành trọn vẹn bài học!',
      },
      {
        id: 'sjc_s5_c2',
        text: 'Cố gục đầu xuống bàn chịu cơn nóng nực và ngủ gật giữa chừng, không kịp hoàn thành nội dung tự học',
        attributeEffects: { morale: -6, reputation: -4, health: -3 },
        outcomeText: 'Cơn oi bức làm bạn ngầy ngật ngủ gật, bị cán bộ trực ban đi qua nhắc nhở vì vi phạm tác phong giờ tự học.',
      },
      {
        id: 'sjc_s5_c3',
        text: 'Đi ra ngoài hành lang tìm nước mát nhưng bình nước lọc 19L ở sảnh đã hết sạch từ chiều',
        attributeEffects: { morale: -3, reputation: -1, health: -2 },
        outcomeText: 'Bình 19L hết nước, bạn đành uống tạm nước ấm rồi quay vào bàn tự học trong mệt mỏi.',
      },
    ],
  },

  // Tình huống 6: Chuẩn bị đêm văn nghệ & Khăn lạnh SJC (Buổi Tối)
  {
    id: 'sjc_situation_6_gala_towel',
    phase: 'evening',
    phaseLabel: 'Tối',
    category: 'sjc_item_event',
    topic: 'sjc_towel_gala',
    title: '[TỐI] Chuẩn bị đêm văn nghệ & Khăn lạnh SJC',
    narrative: '20:00 tối, chuẩn bị bước vào buổi tổng duyệt văn nghệ đại đội. Sau buổi chạy thể lực chiều, mồ hôi nhễ nhại và cái nóng bức oi ả khiến các bạn trong đội văn nghệ uể oải, mất tập trung.',
    speaker: {
      name: 'Đội trưởng văn nghệ',
      role: 'Đồng đội SJC',
      avatarId: 'linh',
      mood: 'worried',
    },
    dialogue: 'Mọi người thở dốc mồ hôi ướt sũng áo thế này, tí nữa lên sân khấu khớp nhạc sợ hụt hơi mất...',
    backgroundType: 'courtyard',
    isSjc: true,
    sjcBadge: '[ĐẶC QUYỀN SJC]',
    choices: [
      {
        id: 'sjc_s6_c1',
        text: 'Lấy Khăn lạnh SJC ướp mát chia cho đồng đội lau mặt hạ nhiệt tức thì, xua tan mệt mỏi và lấy lại năng lượng bùng nổ cho tiết mục',
        attributeEffects: { morale: 10, reputation: 8, health: 4 },
        inventoryRewardId: 'sjc_khan_lanh',
        isSjcChoice: true,
        sjcItemName: 'Khăn lạnh SJC',
        sjcItemIcon: '🧊',
        outcomeText: 'Cảm giác the mát sảng khoái lan tỏa khắp cơ thể, cả đội văn nghệ bừng sáng khí thế, tiết mục tập dượt thành công rực rỡ!',
      },
      {
        id: 'sjc_s6_c2',
        text: 'Dùng vạt áo lau vội mồ hôi, bước vào tập dượt trong trạng thái mệt mỏi, hát sai nhịp và bị nhắc nhở',
        attributeEffects: { morale: -5, reputation: -3, health: -2 },
        outcomeText: 'Giọng hát lạc điệu và vũ đạo rời rạc khiến biên đạo phải cho dừng lại chấn chỉnh tác phong.',
      },
      {
        id: 'sjc_s6_c3',
        text: 'Chạy vào nhà vệ sinh tát nước lã lên mặt làm ướt sũng cổ áo quân phục dã chiến',
        attributeEffects: { morale: -2, reputation: -1, health: -3 },
        outcomeText: 'Nước lã dính nhớp vào cổ áo gây ngứa ngáy khó chịu suốt cả buổi tổng duyệt.',
      },
    ],
  },
];

// Helper: Fisher-Yates shuffle
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// ============================================================================
// 4. THUẬT TOÁN SINH TÌNH HUỐNG HÀNG NGÀY (DAY GENERATOR)
// ============================================================================

// Nhóm tình huống nghiệp vụ quân sự bắt buộc (Military Duty Situations)
export const MILITARY_DUTY_SITUATIONS: StoryEvent[] = [
  // 1. Trực ban tiểu đội (Sáng)
  {
    id: 'truc_ban_tieu_doi',
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'military_duty',
    topic: 'duty_team',
    title: 'Kíp trực ban tiểu đội & Báo cháo bạn ốm',
    narrative: 'Bạn trong kíp trực ban (từ 16h30 hôm trước đến 16h30 hôm nay), sáng ra vừa phải quét hành lang vừa phải đi các phòng gom danh sách báo cháo cho bạn ốm trước giờ ăn.',
    speaker: {
      name: 'Tiểu đội trưởng',
      role: 'Trưởng kíp trực ban',
      avatarId: 'commander',
      mood: 'normal',
    },
    dialogue: 'Sắp đến giờ nhà ăn phát cháo rồi! Phải gom danh sách bạn ốm xuống xin giấy trạm y tế gấp nhé!',
    backgroundType: 'dorm',
    choices: [
      {
        id: 'tbt_c1',
        text: 'Dậy sớm trước báo thức 10 phút, phân công 1 bạn quét hành lang, bạn còn lại cùng mình cầm sổ đi từng phòng xác nhận danh sách rồi xuống y tế xin giấy',
        attributeEffects: { reputation: 12, morale: 6, health: -4 },
        tipRewardId: 'tip_chap_hanh_lenh_truc_ban',
        outcomeText: 'Tác phong chỉn chu khoa học giúp các bạn ốm được nhận cháo nóng đúng giờ, hành lang sạch bóng được chỉ huy khen ngợi!',
      },
      {
        id: 'tbt_c2',
        text: 'Quét vội hành lang rồi quên bẵng việc báo cháo, sát giờ ăn mới cuống cuồng chạy xuống bếp',
        attributeEffects: { reputation: -10, morale: -6 },
        outcomeText: 'Nhà bếp hết suất cháo dự phòng vì báo muộn, bạn phải xin lỗi các bạn ốm trong sự áy náy khôn nguôi.',
      },
      {
        id: 'tbt_c3',
        text: 'Đùn đẩy việc ghi sổ báo cháo cho tiểu đội trưởng để mình chỉ làm việc nhẹ là mở rèm nhà ăn',
        attributeEffects: { reputation: -6, morale: -2, health: 2 },
        outcomeText: 'Thái độ trốn tránh việc khó làm đồng đội trực ban khó chịu, làm giảm sút uy tín cá nhân.',
      },
    ],
  },
  // 2. Vệ sinh khu vực đại đội (Sáng)
  {
    id: 've_sinh_khu_vuc_dai_doi',
    phase: 'morning',
    phaseLabel: 'Sáng',
    category: 'military_duty',
    topic: 'area_cleaning',
    title: 'Vệ sinh khu vực đại đội sân trước D2 (Miễn chạy dài)',
    narrative: 'Sáng sớm được phân công quét khu vực sân trước khung nhà D2 cùng đại đội (được miễn chạy dài thể dục). Nhà kho rất thiếu hót rác nên phải chủ động chuẩn bị.',
    speaker: {
      name: 'Bạn cùng phòng',
      role: 'Tổ trực khu vực',
      avatarId: 'roommate',
      mood: 'normal',
    },
    dialogue: 'Hôm nay được miễn chạy dài 1500m sướng thật, nhưng nghe nói kho hết sạch hót rác rồi đấy!',
    backgroundType: 'courtyard',
    choices: [
      {
        id: 'vskv_c1',
        text: 'Nhớ lời dặn, chủ động cầm sẵn hót rác của phòng mình và xin thêm túi rác ở phòng giặt mang xuống hiện trường cùng chổi',
        attributeEffects: { reputation: 8, morale: 5, health: 2 },
        tipRewardId: 'tip_giup_do_ban_cung_phong',
        outcomeText: 'Sự chu đáo giúp tổ của bạn thu dọn sạch sẽ lá rụng trong nháy mắt, vừa thảnh thơi vừa được miễn chạy dài!',
      },
      {
        id: 'vskv_c2',
        text: 'Chỉ cầm tay không xuống nhà kho lấy chổi, đến nơi hết sạch hót rác đành phải dùng bìa carton vun lá cây mất thời gian',
        attributeEffects: { reputation: -4, morale: -4 },
        outcomeText: 'Bìa carton rách nát làm lá bay tứ tung, quét mãi không xong khiến bạn trễ cả giờ ăn sáng.',
      },
      {
        id: 'vskv_c3',
        text: 'Tranh thủ quét qua loa vài đường rồi lẩn vào góc căng-tin ngồi nghỉ chờ các bạn làm xong',
        attributeEffects: { reputation: -8, morale: -2, health: 4 },
        outcomeText: 'Hành vi trốn việc bị cán bộ kiểm tra bắt gặp, cả tổ bị phê bình và phạt trực nhật bù thêm 2 buổi chiều!',
      },
    ],
  },
  // 3. Trực ban nhà ăn đại đội (Chiều)
  {
    id: 'truc_ban_nha_an_chieu',
    phase: 'afternoon',
    phaseLabel: 'Chiều',
    category: 'military_duty',
    topic: 'mess_hall_duty',
    title: 'Trực ban nhà ăn đại đội & Chuẩn bị mâm cơm 6 người',
    narrative: '16:30 chiều, tiểu đội bạn được phân công làm nhiệm vụ trực nhật nhà ăn đại đội: lau khô bàn ăn inox, xếp chuẩn 6 bát - 6 đôi đũa cho từng mâm và bưng cơm canh nóng sốt chia đều trước khi đại đội hành quân vào ăn.',
    speaker: {
      name: 'Tiểu đội trưởng',
      role: 'Trưởng kíp trực ban',
      avatarId: 'commander',
      mood: 'normal',
    },
    dialogue: 'Mâm nào cũng phải đủ 6 bát, đũa phải dùng khăn sạch lau khô ráo, chia đều thức ăn để đồng đội đi tập về là có cơm nóng ăn ngay nhé!',
    backgroundType: 'canteen',
    choices: [
      {
        id: 'tbna_c1',
        text: 'Tỉ mỉ lau khô từng đôi đũa, xếp bàn ăn ngay ngắn và chia đều từng phần thức ăn nóng sốt',
        attributeEffects: { reputation: 8, morale: 5, health: -2 },
        tipRewardId: 'tip_ky_luat_tu_giac_tap_the',
        outcomeText: 'Mâm cơm tươm tất chuẩn bị chu đáo khiến cả đại đội tấm tắc khen ngợi, kíp trực ban được thầy quản lý nhà ăn biểu dương!',
      },
      {
        id: 'tbna_c2',
        text: 'Chia thức ăn qua loa, để đũa còn ướt và bát đĩa lộn xộn khiến các bạn vào ăn phải tự đi đổi đũa',
        attributeEffects: { reputation: -6, morale: -4 },
        outcomeText: 'Đồng đội phàn nàn vì đũa ướt dính, tiểu đội bị nhắc nhở phải ở lại dọn dẹp vệ sinh nhà ăn sau bữa cơm.',
      },
      {
        id: 'tbna_c3',
        text: 'Nhanh nhẹn phụ các cô cấp dưỡng bê nồi canh lớn và bưng khay cơm phụ các dãy bàn bên cạnh',
        attributeEffects: { reputation: 6, morale: 8, health: 1 },
        tipRewardId: 'tip_giup_do_ban_cung_phong',
        outcomeText: 'Sự nhiệt tình xông xáo giúp công việc xong sớm, các cô cấp dưỡng quý mến thưởng thêm cho tiểu đội đĩa dưa hấu mát lạnh!',
      },
    ],
  },
  // 4. Gác đêm / Gác cổng (Tối)
  {
    id: 'night_guard_duty',
    phase: 'evening',
    phaseLabel: 'Tối',
    category: 'military_duty',
    topic: 'night_guard',
    title: 'Ca gác đêm 01:00 sáng & Duy trì an ninh doanh trại',
    narrative: 'Đến ca trực lúc 01:00 sáng (gác cầu thang trong nhà đối với Nữ / gác cổng doanh trại đối với Nam), không gian đêm hè yên ắng và cơn buồn ngủ ập đến dồn dập cùng bạn gác chung.',
    speaker: {
      name: 'Bạn gác chung',
      role: 'Đồng đội trực gác',
      avatarId: 'roommate',
      mood: 'worried',
    },
    dialogue: 'Mắt cứ díp lại bạn ơi! Đêm hè yên tĩnh thế này rất dễ ngủ gật, chúng mình phải cố bấm tay đi lại giữ tỉnh táo nhé!',
    backgroundType: 'evening_campus',
    choices: [
      {
        id: 'ngd_c1',
        text: 'Đứng đúng vị trí, trang phục chỉnh tề, bấm ngón tay đi lại tuần tra giữ tỉnh táo cùng bạn gác chung',
        attributeEffects: { reputation: 10, morale: 4, health: -3 },
        tipRewardId: 'tip_chap_hanh_lenh_truc_ban',
        outcomeText: 'Ý chí kiên định và tác phong nghiêm túc giúp ca gác hoàn thành xuất sắc, được chỉ huy đi tuần kiểm tra biểu dương!',
      },
      {
        id: 'ngd_c2',
        text: 'Ngồi thụp vào góc khuất lấy điện thoại ra lướt mạng chống buồn ngủ',
        attributeEffects: { reputation: -12, morale: -4, health: -2 },
        outcomeText: 'Cán bộ đi kiểm tra đột xuất phát hiện ánh sáng màn hình điện thoại trong bóng tối, lập biên bản trừ điểm thi đua!',
      },
      {
        id: 'ngd_c3',
        text: 'Rủ bạn trực cùng thay phiên nhau: một người chợp mắt 20 phút rồi đổi lượt',
        attributeEffects: { reputation: -8, health: 2, morale: -2 },
        outcomeText: 'Cả hai đều ngủ quên và giật mình tỉnh dậy khi trời gần sáng, may mắn không có sự cố nhưng canh cánh nỗi lo bị phát hiện.',
      },
    ],
  },
];

export interface GenerateDaySituationsOptions {
  hasTriggeredMilitaryDuty?: boolean;
  onMilitaryDutyTriggered?: (eventId: string) => void;
  sjcSituationsTriggeredCount?: number;
  onSjcTriggered?: (eventId: string) => void;
}

export function generateDaySituations(
  day: number,
  seenEventIds: Set<string> = new Set(),
  options?: GenerateDaySituationsOptions
): StoryEvent[] {
  // SPECIAL: DAY 1 FLOW
  // Day 1 has strict fixed sequence:
  // 1. d1_fixed_morning (Xuất phát ĐH Nhân Văn & Nhận quân trang)
  // 2. d1_fixed_bed_choice (Phân chia giường ngủ phòng 14 người - Chỉ duy nhất Ngày 1)
  // 3. 20:30 Sinh hoạt đại đội Ngày 1
  if (day === 1) {
    const d1Events: StoryEvent[] = [];
    if (FIXED_SCHEDULE_EVENTS['d1_fixed_morning']) {
      const ev = FIXED_SCHEDULE_EVENTS['d1_fixed_morning'];
      seenEventIds.add(ev.id);
      d1Events.push({ ...ev, day: 1 });
    }
    if (FIXED_SCHEDULE_EVENTS['d1_fixed_bed_choice']) {
      const ev = FIXED_SCHEDULE_EVENTS['d1_fixed_bed_choice'];
      seenEventIds.add(ev.id);
      d1Events.push({ ...ev, day: 1 });
    }
    const rollcall = createFixedEveningRollcall(1);
    seenEventIds.add(rollcall.id);
    d1Events.push(rollcall);
    return d1Events;
  }

  // DAYS 2 TO 7 GENERATION
  let targetTotal = Math.floor(Math.random() * 2) + 3; // 3 or 4 situations
  if (day === 7) targetTotal = 3;

  let morningCount = 1;
  let afternoonCount = 1;
  let eveningCount = targetTotal - 2;

  const selectedEvents: StoryEvent[] = [];
  const usedTopicsToday = new Set<string>();

  // 1. MILITARY DUTY ENFORCEMENT LOGIC (Section 1)
  // hasTriggeredMilitaryDuty tracks whether a military duty situation has appeared.
  // In Days 2-4, it can appear naturally.
  // Fallback Checkpoint: If at the end of Day 4 / generating Day 5 hasTriggeredMilitaryDuty === false,
  // MUST force 1 military duty situation on Day 5!
  const hasMilitaryDutyTriggered = options?.hasTriggeredMilitaryDuty ?? false;
  const isMilitaryDutyForceCheckpoint = day === 5 && !hasMilitaryDutyTriggered;

  if (isMilitaryDutyForceCheckpoint) {
    const availableDuty = MILITARY_DUTY_SITUATIONS.filter(
      (ev) => !seenEventIds.has(ev.id) && !usedTopicsToday.has(ev.topic || ev.category)
    );

    if (availableDuty.length > 0) {
      const shuffledDuty = shuffleArray(availableDuty);
      const pickedDuty = shuffledDuty[0];

      seenEventIds.add(pickedDuty.id);
      usedTopicsToday.add(pickedDuty.topic || pickedDuty.category);
      selectedEvents.push({
        ...pickedDuty,
        day,
        title: pickedDuty.title.startsWith(`[${pickedDuty.phaseLabel.toUpperCase()}]`)
          ? pickedDuty.title
          : `[${pickedDuty.phaseLabel.toUpperCase()}] ${pickedDuty.title}`,
      });

      if (pickedDuty.phase === 'morning') morningCount = Math.max(0, morningCount - 1);
      else if (pickedDuty.phase === 'afternoon') afternoonCount = Math.max(0, afternoonCount - 1);
      else if (pickedDuty.phase === 'evening') eveningCount = Math.max(0, eveningCount - 1);

      if (options?.onMilitaryDutyTriggered) {
        options.onMilitaryDutyTriggered(pickedDuty.id);
      }
    }
  }

  // 2. SJC ENFORCEMENT & DISTRIBUTION LOGIC (Section 8)
  const currentSjcCount = options?.sjcSituationsTriggeredCount ?? 0;
  const isSjcForceCheckpoint =
    (day === 5 && currentSjcCount < 1) ||
    (day === 6 && currentSjcCount < 2) ||
    (day === 7 && currentSjcCount < 3);

  const shouldTrySjc =
    isSjcForceCheckpoint ||
    (day >= 2 && day <= 6 && currentSjcCount < 3 && Math.random() < 0.75);

  if (shouldTrySjc) {
    // Find un-triggered SJC situations
    const availableSjc = SJC_MANDATORY_SITUATIONS.filter(
      (ev) => !seenEventIds.has(ev.id) && !usedTopicsToday.has(ev.topic || ev.category)
    );

    if (availableSjc.length > 0) {
      const shuffledSjc = shuffleArray(availableSjc);
      const pickedSjc = shuffledSjc[0];

      seenEventIds.add(pickedSjc.id);
      usedTopicsToday.add(pickedSjc.topic || pickedSjc.category);
      selectedEvents.push({
        ...pickedSjc,
        day,
        title: pickedSjc.title.startsWith(`[${pickedSjc.phaseLabel.toUpperCase()}]`)
          ? pickedSjc.title
          : `[${pickedSjc.phaseLabel.toUpperCase()}] ${pickedSjc.title}`,
      });

      if (pickedSjc.phase === 'morning') morningCount = Math.max(0, morningCount - 1);
      else if (pickedSjc.phase === 'afternoon') afternoonCount = Math.max(0, afternoonCount - 1);
      else if (pickedSjc.phase === 'evening') eveningCount = Math.max(0, eveningCount - 1);

      if (options?.onSjcTriggered) {
        options.onSjcTriggered(pickedSjc.id);
      }
    }
  }

  // Helper to pick non-repeating situations from a pool using Fisher-Yates shuffle
  const pickFromPool = (
    pool: StoryEvent[],
    countNeeded: number,
    phase: 'morning' | 'afternoon' | 'evening',
    phaseLabel: string,
    phaseTag: string
  ) => {
    if (countNeeded <= 0) return;
    const shuffledPool = shuffleArray(pool);

    // 1. Strict filter: unseen and unused topic/category today
    const strictCandidates = shuffledPool.filter((ev) => {
      if (seenEventIds.has(ev.id)) return false;
      const topicKey = ev.topic || ev.category;
      if (usedTopicsToday.has(topicKey)) return false;
      return true;
    });

    for (const ev of strictCandidates) {
      if (countNeeded <= 0) break;
      const topicKey = ev.topic || ev.category;
      usedTopicsToday.add(topicKey);
      seenEventIds.add(ev.id);
      selectedEvents.push({
        ...ev,
        day,
        phase,
        phaseLabel,
        title: ev.title.startsWith(`[${phaseTag}]`) ? ev.title : `[${phaseTag}] ${ev.title}`,
      });

      // Track military duty if chosen naturally
      if (
        ev.category === 'military_duty' ||
        ev.topic === 'duty_team' ||
        ev.topic === 'night_guard' ||
        ev.topic === 'area_cleaning' ||
        ev.topic === 'mess_hall_duty'
      ) {
        if (options?.onMilitaryDutyTriggered) {
          options.onMilitaryDutyTriggered(ev.id);
        }
      }

      countNeeded--;
    }

    // 2. Fallback: unseen across campaign
    if (countNeeded > 0) {
      const unseenFallback = shuffledPool.filter((ev) => !seenEventIds.has(ev.id));
      for (const ev of unseenFallback) {
        if (countNeeded <= 0) break;
        seenEventIds.add(ev.id);
        selectedEvents.push({
          ...ev,
          day,
          phase,
          phaseLabel,
          title: ev.title.startsWith(`[${phaseTag}]`) ? ev.title : `[${phaseTag}] ${ev.title}`,
        });

        if (
          ev.category === 'military_duty' ||
          ev.topic === 'duty_team' ||
          ev.topic === 'night_guard' ||
          ev.topic === 'area_cleaning' ||
          ev.topic === 'mess_hall_duty'
        ) {
          if (options?.onMilitaryDutyTriggered) {
            options.onMilitaryDutyTriggered(ev.id);
          }
        }

        countNeeded--;
      }
    }
  };

  // 1. MORNING
  if (day === 2 && FIXED_SCHEDULE_EVENTS['d2_fixed_morning']) {
    const fixed = FIXED_SCHEDULE_EVENTS['d2_fixed_morning'];
    seenEventIds.add(fixed.id);
    usedTopicsToday.add(fixed.topic || fixed.category);
    selectedEvents.push({ ...fixed, day });
    morningCount = Math.max(0, morningCount - 1);
  } else if (day === 7 && FIXED_SCHEDULE_EVENTS['d7_fixed_morning']) {
    const fixed = FIXED_SCHEDULE_EVENTS['d7_fixed_morning'];
    seenEventIds.add(fixed.id);
    usedTopicsToday.add(fixed.topic || fixed.category);
    selectedEvents.push({ ...fixed, day });
    morningCount = Math.max(0, morningCount - 1);
  }

  if (morningCount > 0) {
    pickFromPool(MORNING_SITUATIONS, morningCount, 'morning', 'Sáng', 'SÁNG');
  }

  // 2. AFTERNOON
  if (day === 6 && FIXED_SCHEDULE_EVENTS['d6_fixed_afternoon']) {
    const fixed = FIXED_SCHEDULE_EVENTS['d6_fixed_afternoon'];
    seenEventIds.add(fixed.id);
    usedTopicsToday.add(fixed.topic || fixed.category);
    selectedEvents.push({ ...fixed, day });
    afternoonCount = Math.max(0, afternoonCount - 1);
  }

  if (afternoonCount > 0) {
    pickFromPool(AFTERNOON_SITUATIONS, afternoonCount, 'afternoon', 'Chiều', 'CHIỀU');
  }

  // 3. EVENING
  // 20h30 Rollcall is a military fixture every evening
  if (eveningCount > 0) {
    const rollcall = createFixedEveningRollcall(day);
    seenEventIds.add(rollcall.id);
    selectedEvents.push(rollcall);
    eveningCount = Math.max(0, eveningCount - 1);
  }

  if (eveningCount > 0) {
    pickFromPool(EVENING_SITUATIONS, eveningCount, 'evening', 'Tối', 'TỐI');
  }

  // Chronological sort: Sáng -> Trưa -> Chiều -> Tối
  const phaseRank: Record<string, number> = {
    morning: 1,
    noon: 2,
    afternoon: 3,
    evening: 4,
  };

  selectedEvents.sort((a, b) => (phaseRank[a.phase] || 1) - (phaseRank[b.phase] || 1));

  return selectedEvents;
}

// Alias for backwards compatibility
export const generateDailyEvents = generateDaySituations;

// ============================================================================
// 5. THẺ SỰ KIỆN BẤT NGỜ SJC (POPUP RANDOM - KHÔNG LỰA CHỌN)
// ============================================================================

export const SJC_POPUP_EVENTS: RandomPopupEvent[] = [
  {
    id: 'rnd_sjc_fanpage_content',
    title: 'Viết content gấp cho Fanpage Viện',
    description: '20h00, Chủ nhiệm CLB nhắn tin gấp: "Em ơi, làm gấp bài phản ánh sự kiện Hola cho Fanpage Viện nhé, rồi đăng luôn nhé!". Bạn phải tức tốc gõ bài và đăng tải trước 20h20 nộp điện thoại.',
    attributeEffects: { morale: -5, reputation: 6, health: -3 },
    category: 'sjc_random_popup',
    icon: '✍️',
    isSjc: true,
    sjcBadge: '[TIN KHẨN SJC]',
  },
  {
    id: 'rnd_sjc_viral_photo',
    title: 'Bức ảnh Hola triệu view',
    description: 'Bức ảnh khoảnh khắc rèn luyện ở Hola do bạn chụp trong giờ dùng điện thoại và cuối tuần được đăng lên Fanpage Viện, nhận về hàng trăm lượt tương tác và lời khen từ thầy cô.',
    attributeEffects: { morale: 12, reputation: 8 },
    category: 'sjc_random_popup',
    icon: '📸',
    isSjc: true,
    sjcBadge: '[TIN VUI SJC]',
  },
  {
    id: 'rnd_sjc_catch_4g_wave',
    title: 'Săn sóng 4G nộp bài thu hoạch',
    description: 'Chủ nhật là deadline bài thu hoạch chuyến đi thực tế cùng lớp Báo chí, nhưng mạng quá lag. Bạn phải chạy khắp đồi Hola tìm nơi bắt 4G mạnh nhất để kịp đăng bài và nộp tiểu luận.',
    attributeEffects: { morale: -4, reputation: 10 },
    category: 'sjc_random_popup',
    icon: '📶',
    isSjc: true,
    sjcBadge: '[ĐẶC NHIỆM SJC]',
  },
];

// Standard Random Popups
export const STANDARD_RANDOM_POPUP_EVENTS: RandomPopupEvent[] = [
  {
    id: 'rnd_nhat_50k',
    title: 'Lộc lá bất ngờ!',
    description: 'Trong lúc kéo dát giường lau bụi, bạn tình cờ nhặt được tờ 50.000đ kẹp sâu ở khe phản gỗ từ khóa trước để lại!',
    attributeEffects: { morale: 8, money: 50000 },
    icon: '💵',
  },
  {
    id: 'rnd_ong_dot',
    title: 'Tai nạn con ong!',
    description: 'Thấy con ong đậu trên ghế tưởng đã chết, bạn cầm giấy định vứt đi thì bị đốt trúng ngón tay sưng vù!',
    attributeEffects: { health: -12, morale: -5 },
    icon: '🐝',
  },
  {
    id: 'rnd_truot_chan_rach_quan',
    title: 'Trượt chân bìa rừng!',
    description: 'Giờ giải lao ra khám phá bìa rừng thông, bạn trượt chân ngã lấm lem bùn đất và rách một vạt gấu quần dã chiến!',
    attributeEffects: { morale: -10, reputation: -2, money: -10000 },
    icon: '🌲',
  },
  {
    id: 'rnd_quat_thoc_mat',
    title: 'Viêm họng đêm gió!',
    description: 'Đêm ngủ bật quạt thốc thẳng vào mặt cho mát, sáng dậy cổ họng khô khốc, viêm họng tắt cả tiếng!',
    attributeEffects: { health: -10, morale: -4 },
    icon: '💨',
  },
  {
    id: 'rnd_mat_nuoc_goi_dau',
    title: 'Sự cố mất nước!',
    description: 'Đang xoa đầy bọt dầu gội đầu thì vòi nước kêu khẹc khẹc rồi ngắt ngấm, bạn đành phải lấy chai nước khoáng dội tạm!',
    attributeEffects: { health: -5, morale: -8 },
    icon: '🚿',
  },
  {
    id: 'rnd_sap_tran_nhua',
    title: 'Sự cố nhà vệ sinh!',
    description: 'Đường ống nước nhà vệ sinh tầng trên bị rò rỉ làm sập một mảng trần nhựa, cả phòng phải nháo nhào phụ dọn nước tràn!',
    attributeEffects: { health: -6, morale: -6 },
    icon: '🛠️',
  },
  {
    id: 'rnd_lag_4g_deadline',
    title: 'Sóng 4G chập chờn!',
    description: 'Chủ Nhật đến hạn nộp bài thu hoạch trực tuyến mà mạng 4G đồi Hòa Lạc giật lag, bạn phải chạy khắp nơi tìm sóng!',
    attributeEffects: { morale: -7, health: -4 },
    icon: '📶',
  },
  {
    id: 'rnd_nham_dau_goi',
    title: 'Tắm nhầm dầu gội!',
    description: 'Vội vàng đi tắm lúc trời chập choạng tối, bạn lấy nhầm chai dầu gội đầu (Shampoo) thoa khắp người làm sữa tắm!',
    attributeEffects: { morale: -5 },
    icon: '🧴',
  },
  {
    id: 'rnd_gio_bay_moc_ao',
    title: 'Gió lốc đồi Hòa Lạc!',
    description: 'Cơn gió đồi chiều thổi mạnh bất ngờ hất tung 2 chiếc móc áo cùng đôi tất phơi trên dây rơi xuống mái che tầng dưới!',
    attributeEffects: { morale: -4, reputation: -2 },
    icon: '💨',
  },
  {
    id: 'rnd_mua_dong_tranh_may_say',
    title: 'Cơn mưa giông bất chợt!',
    description: 'Chiều tập ngoài bãi giông đổ mưa bất ngờ làm ướt sũng quân phục, tối đến cả phòng chen nhau chiếc máy sấy tóc!',
    attributeEffects: { health: -4, morale: -6 },
    icon: '🌧️',
  },
];

// Combined pool of random popup events
export const RANDOM_POPUP_EVENTS: RandomPopupEvent[] = [
  ...SJC_POPUP_EVENTS,
  ...STANDARD_RANDOM_POPUP_EVENTS,
];
