/**
 * Phân định rành mạch giữa các quy tắc đã xác nhận (Confirmed Rules)
 * và các giả định kinh doanh cần quán duyệt (Unconfirmed Assumptions).
 */

export const CONFIRMED_RULES = {
  // 5 size chuẩn xác của Cheesie
  sizes: ['S', 'M', 'L', 'XL', 'XXL'] as const,

  // Giá niêm yết theo size (VND)
  sizePrices: {
    S: 45000,
    M: 65000,
    L: 75000,
    XL: 95000,
    XXL: 115000,
  } as const,

  // Định lượng số phần nhân và sốt chuẩn
  sizePortions: {
    S: { protein: 1, sauce: 1 },
    M: { protein: 2, sauce: 1 },
    L: { protein: 3, sauce: 2 },
    XL: { protein: 4, sauce: 3 },
    XXL: { protein: 5, sauce: 4 },
  } as const,

  // Thành phần đi kèm miễn phí theo size
  sizeBase: {
    S: [] as string[],
    M: ['Mozzarella'],
    L: ['Mozzarella'],
    XL: ['Mozzarella', 'Trứng'],
    XXL: ['Mozzarella', 'Trứng', 'Bacon'],
  } as const,

  // Quy tắc không chọn trùng nhân hoặc sốt trong hạn mức size
  uniqueIncludedProteins: true,
  uniqueIncludedSauces: true,

  // Bắt buộc phải chọn đúng và đủ số lượng nhân & sốt trước khi thêm vào giỏ
  exactIncludedCountsRequired: true,

  // Không âm thầm xóa lựa chọn khi người dùng giảm size: phải hỏi xác nhận
  explicitConfirmationOnSizeReduction: true,
} as const;

export const UNCONFIRMED_ASSUMPTIONS = {
  /**
   * Giả định 1: Số lượng tối đa cho mỗi loại topping thêm.
   * Prototype tạm giới hạn mỗi loại topping tối đa 1 phần.
   * Quán cần duyệt xem khách có thể gọi 2-3 phần cùng loại không.
   */
  maxPerExtraOption: 1,

  /**
   * Giả định 2: Topping thêm có được trùng với nhân chính đã chọn hay không.
   * Hiện tại cho phép gọi Heo/Bò/Gà thêm độc lập với nhân theo size.
   */
  allowExtraProteinRepeatingIncluded: true,

  /**
   * Giả định 3: Topping thêm có phô mai/trứng/bacon vốn đã có sẵn theo size.
   * Khách có thể trả thêm tiền để có thêm trứng/phô mai/bacon nữa.
   */
  allowOrderingIncludedBaseAsPaidExtra: true,

  /**
   * Giả định 4: Sốt thêm chỉ được chọn trong các vị sốt chưa được chọn làm sốt chính,
   * hoặc mở sau khi đã chọn đủ sốt theo size.
   */
  extraSauceRequiresIncludedSaucesComplete: true,
  uniqueFlavorForExtraSauce: true,

  /**
   * Giả định 5: Giới hạn số lượng món trong giỏ hàng.
   */
  maxItemQuantityInCart: 99,
  maxTotalCartLines: 50,
} as const;
