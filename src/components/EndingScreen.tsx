import React from 'react';
import { Award, Heart, Smile, Star, Wallet, RotateCcw, BookOpen, Backpack } from 'lucide-react';
import { AttributeState, EndingType } from '../types/game';

interface EndingScreenProps {
  attributes: AttributeState;
  unlockedTipsCount: number;
  totalTipsCount: number;
  inventoryCount: number;
  onRestart: () => void;
}

export const EndingScreen: React.FC<EndingScreenProps> = ({
  attributes,
  unlockedTipsCount,
  totalTipsCount,
  inventoryCount,
  onRestart,
}) => {
  // Determine ending type based on accumulated campaign state
  const determineEnding = (): {
    type: EndingType;
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    badgeName: string;
  } => {
    if (attributes.health >= 70 && attributes.morale >= 70 && attributes.reputation >= 75) {
      return {
        type: 'A',
        title: 'KẾT THÚC A: CHIẾN SĨ XUẤT SẮC TOÀN DIỆN',
        subtitle: 'Tân binh kiểu mẫu xuất sắc của HOLA',
        description:
          'Bạn đã hoàn thành tuần đầu tiên (7 ngày) học quân sự với thành tích mẫu mực! Không chỉ giữ vững sức khỏe dẻo dai và tinh thần lạc quan, bạn còn tạo dựng được uy tín tuyệt đối với chỉ huy và đồng đội. Chiếc chăn vuông vức, tác phong nhanh nhẹn và tinh thần trách nhiệm của bạn là niềm tự hào của cả đại đội!',
        badge: '🎖️',
        badgeName: 'Huân chương Tân Binh Xuất Sắc',
      };
    }

    if (attributes.reputation >= 70 && attributes.morale >= 60) {
      return {
        type: 'C',
        title: 'KẾT THÚC C: NGƯỜI ĐỒNG ĐỘI ĐÁNG TIN CẬY',
        subtitle: 'Chỗ dựa vững chắc của cả tiểu đội',
        description:
          'Trong suốt 7 ngày sinh tồn tại Hòa Lạc, bạn luôn là người đồng đội biết sẻ chia từng thìa cơm, giúp đỡ bạn bè gấp chăn nội vụ và sẵn lòng hỗ trợ đồng đội khi gặp khó. Nụ cười và tinh thần tương thân tương ái của bạn đã gắn kết cả phòng thành một gia đình bền chặt!',
        badge: '🤝',
        badgeName: 'Huy hiệu Đồng Đội Tri Kỷ',
      };
    }

    if (attributes.money >= 150000 && attributes.health >= 55) {
      return {
        type: 'D',
        title: 'KẾT THÚC D: BẬC THẦY QUẢN LÝ THỰC TẾ',
        subtitle: 'Quản lý tài chính và quân tư trang xuất sắc',
        description:
          'Bạn là người có đầu óc tính toán chi tiêu cực kỳ sắc sảo! Suốt 7 ngày rèn luyện, bạn vẫn giữ được hầu bao rủng rỉnh, đồ đạc nguyên vẹn không thất lạc món nào và luôn chủ động trong mọi tình huống. Khả năng lập kế hoạch và tính tự lập của bạn khiến ai cũng phải khâm phục!',
        badge: '⚖️',
        badgeName: 'Chứng chỉ Quản Trị Viên Bản Lĩnh',
      };
    }

    if (attributes.health >= 45 && attributes.morale >= 45) {
      return {
        type: 'B',
        title: 'KẾT THÚC B: TRƯỞNG THÀNH QUA THỬ THÁCH',
        subtitle: 'Bản lĩnh tôi luyện sau mưa nắng thao trường',
        description:
          'Hành trình 7 ngày đầu của bạn không hề bằng phẳng: đã có những buổi sáng cuống cuồng báo thức 5h30, những đôi chân mỏi nhừ và cái lạnh sương sớm Hòa Lạc. Nhưng qua từng thử thách, bạn đã học cách đứng dậy, thích nghi và mạnh mẽ hơn gấp bội!',
        badge: '🌱',
        badgeName: 'Huy hiệu Chiến Binh Kiên Cường',
      };
    }

    return {
      type: 'E',
      title: 'KẾT THÚC E: HOÀN THÀNH TUẦN RÈN LUYỆN',
      subtitle: 'Những bài học quý giá cho tương lai',
      description:
        'Tuần đầu quân sự 7 ngày đã mang đến cho bạn nhiều trải nghiệm thực tế sâu sắc về tính kỷ luật, nếp sống tập thể và cách tự lập khi xa gia đình. Dù có những tình huống chưa hoàn hảo, bạn vẫn kiên trì vượt qua trọn vẹn 7 ngày để trưởng thành hơn từng ngày!',
      badge: '📖',
      badgeName: 'Kỷ niệm chương Trải Nghiệm Thanh Xuân',
    };
  };

  const ending = determineEnding();
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-500">
      <div className="max-w-2xl w-full bg-stone-900 border-2 border-emerald-500/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-3 rounded-3xl bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center text-5xl shadow-lg">
            {ending.badge}
          </div>

          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            {ending.subtitle}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            {ending.title}
          </h1>
          <div className="inline-block px-3 py-1 rounded-full bg-stone-800 border border-stone-700 text-amber-300 font-semibold text-xs">
            {ending.badgeName}
          </div>
        </div>

        {/* Narrative Description */}
        <div className="bg-stone-850 border border-stone-750 rounded-2xl p-4 sm:p-5 text-sm text-stone-300 leading-relaxed mb-6 text-justify">
          {ending.description}
        </div>

        {/* Campaign Final Metrics */}
        <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-4 sm:p-5 mb-6">
          <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>KẾT QUẢ TỔNG KẾT SAU 28 NGÀY:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="bg-stone-900 rounded-xl p-2.5 text-center border border-stone-800">
              <div className="flex items-center justify-center gap-1 text-xs text-rose-400 font-semibold mb-1">
                <Heart className="w-3.5 h-3.5 fill-rose-500" />
                <span>Sức khỏe</span>
              </div>
              <div className="font-mono text-lg font-bold text-white tabular-nums">
                {attributes.health}/100
              </div>
            </div>

            <div className="bg-stone-900 rounded-xl p-2.5 text-center border border-stone-800">
              <div className="flex items-center justify-center gap-1 text-xs text-blue-400 font-semibold mb-1">
                <Smile className="w-3.5 h-3.5" />
                <span>Tinh thần</span>
              </div>
              <div className="font-mono text-lg font-bold text-white tabular-nums">
                {attributes.morale}/100
              </div>
            </div>

            <div className="bg-stone-900 rounded-xl p-2.5 text-center border border-stone-800">
              <div className="flex items-center justify-center gap-1 text-xs text-amber-400 font-semibold mb-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>Uy tín</span>
              </div>
              <div className="font-mono text-lg font-bold text-white tabular-nums">
                {attributes.reputation}/100
              </div>
            </div>

            <div className="bg-stone-900 rounded-xl p-2.5 text-center border border-stone-800">
              <div className="flex items-center justify-center gap-1 text-xs text-emerald-400 font-semibold mb-1">
                <Wallet className="w-3.5 h-3.5" />
                <span>Số dư ví</span>
              </div>
              <div className="font-mono text-sm font-bold text-emerald-400 tabular-nums">
                {formatMoney(attributes.money)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-stone-900/60 rounded-xl p-3 border border-stone-800 flex items-center justify-between">
              <span className="flex items-center gap-2 text-stone-300">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Mẹo sinh tồn:</span>
              </span>
              <span className="font-mono font-bold text-amber-300">
                {unlockedTipsCount} / {totalTipsCount} ({Math.round((unlockedTipsCount / totalTipsCount) * 100)}%)
              </span>
            </div>

            <div className="bg-stone-900/60 rounded-xl p-3 border border-stone-800 flex items-center justify-between">
              <span className="flex items-center gap-2 text-stone-300">
                <Backpack className="w-4 h-4 text-emerald-400" />
                <span>Vật phẩm túi đồ:</span>
              </span>
              <span className="font-mono font-bold text-emerald-300">
                {inventoryCount} món
              </span>
            </div>
          </div>
        </div>

        {/* Graduation Quote */}
        <div className="text-center text-xs text-stone-400 italic mb-6">
          "Hòa Lạc không chỉ là nơi học quân sự, mà là nơi bạn đã tìm thấy phiên bản kiên cường nhất của chính mình."
        </div>

        {/* Replay Button */}
        <button
          onClick={onRestart}
          className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-emerald-700/30 hover:shadow-emerald-600/50 transition-all cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>CHƠI LẠI CHIẾN DỊCH (TỪ NGÀY 01)</span>
        </button>
      </div>
    </div>
  );
};
