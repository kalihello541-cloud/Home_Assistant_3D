// Demo apartamento 3 phòng ngủ, 2 WC – đầy đủ nội thất, mặt bằng sàn chung cư (tầng 30).
//
// Mặt bằng 13 m x 11.5 m (x: 0-13 phải, z: 0-11.5 xuống):
//
//   Ban công 1.5x4.5 (gắn phòng ngủ master, phía bắc)
//   +------------------------------------------------------------------------------+
//   | Phòng ngủ master | WC riêng | Phòng ngủ 3 |  Phòng ngủ 2  4.5x4.5         |
//   |     4.5x4.5      | 1.5x2.5  |   2.5x4.5   |                                 |
//   +------------------+----------+-------------+---------------------------------+
//   |      Phòng khách 4.5x4.5      | Phòng ăn 3.5x2.5 | Lô gia | Phòng làm việc |
//   |                               |                  | 2.5x2.5|    2.5x4.0     |
//   +-------------------------------+------------------+--------+-----------------+
//   | Nhà bếp 2.5x2.5 | WC chính 1.5x2.5 |      Hành lang (kết nối toàn bộ)      |
//   +------------------------------------------------------------------------------+
//   Cửa chính (front door) nằm trên cạnh nam, mở vào hành lang.

const rect = (id, name, area_id, x0, z0, x1, z1, floor_material = "wood") => ({
  id,
  name,
  area_id,
  points: [
    [x0, z0],
    [x1, z0],
    [x1, z1],
    [x0, z1],
  ],
  floor_material,
});

const floor = (id, name, elevation, rooms) => ({
  id,
  name,
  elevation,
  height: 2.75,
  cut_height: 1.15,
  rooms,
  openings: [],
  furniture: [],
  placements: [],
  background: null,
  outdoor: [],
  walls: [],
  ha_floor: null,
});

export const DEMO_FLOORS = {
  tram: { floor_id: "30", name: "Tầng 30", level: 30 },
};

// Tên khu vực trong Home Assistant (tiếng Việt)
export const DEMO_AREAS = {
  phongKhach: { area_id: "phong_khach", name: "Phòng khách", floor_id: "30" },
  master: { area_id: "phong_ngu_master", name: "Phòng ngủ master", floor_id: "30" },
  wcMaster: { area_id: "wc_master", name: "WC riêng master", floor_id: "30" },
  phongNguy3: { area_id: "phong_ngu_3", name: "Phòng ngủ 3", floor_id: "30" },
  phongNguy2: { area_id: "phong_ngu_2", name: "Phòng ngủ 2", floor_id: "30" },
  phongAn: { area_id: "phong_an", name: "Phòng ăn", floor_id: "30" },
  loGia: { area_id: "lo_gia", name: "Lô gia", floor_id: "30" },
  phongLamViec: { area_id: "phong_lam_viec", name: "Phòng làm việc", floor_id: "30" },
  hanhLang: { area_id: "hanh_lang", name: "Hành lang", floor_id: "30" },
  nhaBep: { area_id: "nha_bep", name: "Nhà bếp", floor_id: "30" },
  wcChinh: { area_id: "wc_chinh", name: "WC chính", floor_id: "30" },
  banCong: { area_id: "ban_cong", name: "Ban công", floor_id: "30" },
};

export const DEMO_BUILDING = {
  version: 1,
  settings: { wall_exterior: 0.24, wall_interior: 0.12, grid: 0.05, north: 0, roof: { type: "none", pitch: 35, overhang: 0.4 } },
  floors: [
    floor("30", "Tầng 30", 0, [
      // Hàng trên (z 0-4.5)
      rect("master", "Phòng ngủ master", "phong_ngu_master", 0, 0, 4.5, 4.5),
      rect("wc_master", "WC riêng master", "wc_master", 4.5, 0, 6, 2.5, "tiles"),
      rect("bed3", "Phòng ngủ 3", "phong_ngu_3", 6, 0, 8.5, 4.5, "wood"),
      rect("bed2", "Phòng ngủ 2", "phong_ngu_2", 8.5, 0, 13, 4.5),
      // Hàng giữa (z 4.5-9)
      rect("living", "Phòng khách", "phong_khach", 0, 4.5, 4.5, 9, "oak"),
      rect("dining", "Phòng ăn", "phong_an", 6, 4.5, 9.5, 7, "oak"),
      rect("loggia", "Lô gia", "lo_gia", 10.5, 4.5, 13, 7, "tiles", [null, 1.05, null, null]),
      rect("work", "Phòng làm việc", "phong_lam_viec", 10.5, 7, 13, 11),
      // Nhà bếp + WC chính (z 9-11.5)
      rect("kitchen", "Nhà bếp", "nha_bep", 0, 9, 2.5, 11.5, "tiles"),
      rect("wc", "WC chính", "wc_chinh", 2.5, 9, 4, 11.5, "tiles"),
      // Hành lang: mạch L kết nối cửa chính (nam) lên tận WC riêng + phòng ngủ
      {
        id: "hall",
        name: "Hành lang",
        area_id: "hanh_lang",
        points: [
          [4.5, 2.5],
          [6, 2.5],
          [6, 7],
          [9.5, 7],
          [9.5, 4.5],
          [10.5, 4.5],
          [10.5, 11],
          [13, 11],
          [13, 11.5],
          [4, 11.5],
          [4, 9],
          [4.5, 9],
        ],
        floor_material: "tiles",
      },
      // Ban công 1.5 x 4.5 gắn phòng ngủ master (trần thấp 1.05 m, cửa trượt kính)
      {
        id: "balcony",
        name: "Ban công",
        area_id: "ban_cong",
        points: [
          [0, -1.5],
          [4.5, -1.5],
          [4.5, 0],
          [0, 0],
        ],
        floor_material: "concrete",
        wall_heights: [1.05, 1.05, null, 1.05],
      },
    ]),
  ],
};

// Cửa + cửa sổ (edge chỉ số cạnh của room, offset tính từ điểm bắt đầu cạnh)
const O = (id, room_id, edge, offset, width, extra = {}) => ({
  id,
  room_id,
  edge,
  offset,
  width,
  type: "door",
  sill: 0,
  height: 2.05,
  hinge: "left",
  leaves: 1,
  swing: "in",
  contact2: null,
  cover: null,
  contact: null,
  tilt: null,
  ...extra,
});

DEMO_BUILDING.floors[0].openings = [
  // Cửa chính (front door) trên cạnh nam của hành lang
  O("door_front", "hall", 8, 7.5, 0.9, { style: "front", swing: "out" }),
  // Cửa hành lang -> các phòng
  O("door_wc", "hall", 9, 1.5, 0.75),
  O("door_work", "hall", 5, 5.5, 0.9),
  // Thông phòng khách sang hành lang (không khép)
  O("pass_living", "living", 1, 2.0, 1.8, { style: "passage" }),
  // Thông phòng ăn sang hành lang
  O("pass_dining", "dining", 2, 1.75, 2.0, { style: "passage" }),
  // Cửa lô gia (kính) từ hành lang
  O("door_loggia", "loggia", 3, 1.25, 1.2, { style: "glass" }),
  // Cửa các phòng ngủ
  O("door_master", "master", 1, 3.2, 0.9),
  O("door_wc_master", "wc_master", 3, 1.5, 0.75),
  O("door_bed3", "bed3", 3, 1.5, 0.9),
  O("door_bed2", "bed2", 2, 3.0, 0.9),
  // Cửa bếp từ phòng khách
  O("door_kitchen", "kitchen", 0, 1.25, 0.9),
  // Cửa trượt ra ban công (từ phòng ngủ master)
  O("door_balcony", "balcony", 2, 2.25, 1.8, { style: "sliding", leaves: 2, sill: 0, height: 2.1 }),
  // Cửa sổ (sill 0.9, cao 1.3)
  O("win_master", "master", 0, 2.25, 2.0, { type: "window", sill: 0.9, height: 1.3 }),
  O("win_bed3", "bed3", 0, 1.25, 1.2, { type: "window", sill: 0.9, height: 1.3 }),
  O("win_bed2", "bed2", 0, 2.25, 1.5, { type: "window", sill: 0.9, height: 1.3 }),
  O("win_bed2_e", "bed2", 1, 1.5, 1.2, { type: "window", sill: 0.9, height: 1.3 }),
  O("win_living", "living", 3, 2.25, 2.0, { type: "window", sill: 0.9, height: 1.3 }),
  O("win_kitchen", "kitchen", 3, 1.25, 1.0, { type: "window", sill: 0.9, height: 1.3 }),
  O("win_loggia", "loggia", 1, 1.0, 2.0, { type: "window", sill: 0.3, height: 1.75 }),
  O("win_work", "work", 1, 2.0, 1.5, { type: "window", sill: 0.9, height: 1.3 }),
];

const svgPicture = (body) => `data:image/svg+xml;base64,${btoa(body)}`;
const COVER = svgPicture(
  '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#14532d"/><stop offset="1" stop-color="#b91c1c"/></linearGradient></defs><rect width="320" height="180" fill="url(#g)"/><text x="24" y="90" font-family="sans-serif" font-size="36" font-weight="700" fill="#fff">Sáng nay</text></svg>',
);

export const DEMO_PICTURES = {
  pic_cam_hanhlang: svgPicture(
    '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="#0f172a"/><rect x="20" y="20" width="140" height="90" fill="#1e293b"/><text x="160" y="24" font-family="monospace" font-size="12" fill="#38bdf8">LIVE</text><text x="16" y="130" font-family="monospace" font-size="11" fill="#94a3b8">KAMERA HÀNH LANG</text></svg>',
  ),
};

// Thiết bị điện: đèn
const light = (id, name, area, on, extra = {}) => ({
  entry: { entity_id: `light.${id}`, area_id: area },
  state: {
    entity_id: `light.${id}`,
    state: on ? "on" : "off",
    attributes: {
      friendly_name: name,
      supported_color_modes: ["color_temp", "hs"],
      color_mode: "color_temp",
      min_color_temp_kelvin: 2200,
      max_color_temp_kelvin: 6500,
      ...(on ? { brightness: 180, color_temp_kelvin: 2700 } : {}),
      ...extra,
    },
  },
});

const entity = (entity_id, area, state, attributes) => ({
  entry: { entity_id, area_id: area },
  state: { entity_id, state, attributes },
});

const place = (entity_id, x, z) => ({ entity_id, x, z, y: null, mount: "ceiling" });

// Danh sách thiết bị cho preview (tất cả entry + state)
const DEVICES = [
  // Phòng ngủ master
  light("master_decke", "Đèn phòng ngủ master", "phong_ngu_master", true),
  { entry: { entity_id: "light.master_tranh", area_id: "phong_ngu_master" }, state: { entity_id: "light.master_tranh", state: "on", attributes: { friendly_name: "Đèn tranh master", brightness: 90, color_mode: "hs", rgb_color: [255, 190, 120] } } },
  { entry: { entity_id: "climate.master", area_id: "phong_ngu_master" }, state: { entity_id: "climate.master", state: "cool", attributes: { friendly_name: "Điều hòa phòng master", current_temperature: 24.2, temperature: 25, hvac_modes: ["off", "heat", "cool"], hvac_action: "idle", min_temp: 16, max_temp: 32 } } },
  // WC riêng master
  light("wc_master_decke", "Đèn WC riêng", "wc_master", true, { brightness: 220, color_temp_kelvin: 4000 }),
  // Phòng ngủ 3
  light("phong_ngu_3_decke", "Đèn phòng ngủ 3", "phong_ngu_3", true),
  // Phòng ngủ 2
  light("phong_ngu_2_decke", "Đèn phòng ngủ 2", "phong_ngu_2", true),
  { entry: { entity_id: "climate.phong_ngu_2", area_id: "phong_ngu_2" }, state: { entity_id: "climate.phong_ngu_2", state: "cool", attributes: { friendly_name: "Điều hòa phòng ngủ 2", current_temperature: 25.5, temperature: 24, hvac_modes: ["off", "heat", "cool", "auto"], hvac_action: "cooling", min_temp: 16, max_temp: 32 } } },
  // Phòng khách
  light("phong_khach_decke", "Đèn phòng khách", "phong_khach", true),
  { entry: { entity_id: "light.stehlampe", area_id: "phong_khach" }, state: { entity_id: "light.stehlampe", state: "on", attributes: { friendly_name: "Đèn đứng phòng khách", brightness: 90, color_mode: "hs", rgb_color: [255, 150, 60] } } },
  { entry: { entity_id: "climate.phong_khach", area_id: "phong_khach" }, state: { entity_id: "climate.phong_khach", state: "cool", attributes: { friendly_name: "Điều hòa phòng khách", current_temperature: 23.8, temperature: 26, hvac_modes: ["off", "heat", "cool", "auto"], hvac_action: "cooling", min_temp: 16, max_temp: 32 } } },
  { entry: { entity_id: "media_player.tivi_phongkhach", area_id: "phong_khach" }, state: { entity_id: "media_player.tivi_phongkhach", state: "playing", attributes: { friendly_name: "Tivi", device_class: "tv", app_name: "Netflix", media_title: "Phim hành động", volume_level: 0.4, entity_picture: COVER } } },
  { entry: { entity_id: "camera.hanh_lang", area_id: "hanh_lang" }, state: { entity_id: "camera.hanh_lang", state: "idle", attributes: { friendly_name: "Camera hành lang", entity_picture: DEMO_PICTURES.pic_cam_hanhlang } } },
  { entry: { entity_id: "cover.rèm_phong_khach", area_id: "phong_khach" }, state: { entity_id: "cover.rèm_phong_khach", state: "closed", attributes: { friendly_name: "Rèm cửa sổ phòng khách", current_position: 0, supported_features: 15 } } },
  // Phòng ăn
  light("phong_an_pendant", "Đèn thả phòng ăn", "phong_an", true, { brightness: 140 }),
  // Lô gia
  light("lo_gia_decke", "Đèn lô gia", "lo_gia", true, { brightness: 170 }),
  // Phòng làm việc
  light("phong_lam_viec_decke", "Đèn phòng làm việc", "phong_lam_viec", true),
  // Nhà bếp
  light("nha_bep_decke", "Đèn nhà bếp", "nha_bep", true),
  { entry: { entity_id: "switch.kaffeemaschine", area_id: "nha_bep" }, state: { entity_id: "switch.kaffeemaschine", state: "on", attributes: { friendly_name: "Máy pha cà phê" } } },
  // WC chính
  light("wc_chinh_decke", "Đèn WC chính", "wc_chinh", true, { brightness: 220, color_temp_kelvin: 4000 }),
  // Hành lang
  light("hanh_lang_decke", "Đèn hành lang", "hanh_lang", true, { brightness: 190 }),
  // Ban công
  light("ban_cong", "Đèn ban công", "ban_cong", true, { brightness: 160, color_temp_kelvin: 3000 }),
  // Cảm biến + thiết bị khác
  { entry: { entity_id: "sensor.phong_khach_nhietao", area_id: "phong_khach" }, state: { entity_id: "sensor.phong_khach_nhietao", state: "24.5", attributes: { friendly_name: "Nhiệt độ phòng khách", device_class: "temperature", unit_of_measurement: "°C" } } },
  { entry: { entity_id: "sensor.phong_khach_doam", area_id: "phong_khach" }, state: { entity_id: "sensor.phong_khach_doam", state: "52", attributes: { friendly_name: "Độ ẩm phòng khách", device_class: "humidity", unit_of_measurement: "%" } } },
  { entry: { entity_id: "sensor.nha_bep_dien", area_id: "nha_bep" }, state: { entity_id: "sensor.nha_bep_dien", state: "0.8", attributes: { friendly_name: "Điện nhà bếp", device_class: "power", unit_of_measurement: "kW" } } },
  { entry: { entity_id: "binary_sensor.cua_ra_vao", area_id: "hanh_lang" }, state: { entity_id: "binary_sensor.cua_ra_vao", state: "off", attributes: { friendly_name: "Cửa ra vào", device_class: "door" } } },
  { entry: { entity_id: "binary_sensor.cua_soo_bep", area_id: "nha_bep" }, state: { entity_id: "binary_sensor.cua_soo_bep", state: "off", attributes: { friendly_name: "Cửa sổ bếp", device_class: "window" } } },
  { entry: { entity_id: "binary_sensor.khoi_bep", area_id: "nha_bep" }, state: { entity_id: "binary_sensor.khoi_bep", state: "off", attributes: { friendly_name: "Cảm biến khói", device_class: "smoke" } } },
  { entry: { entity_id: "binary_sensor.ro_nuoc_wc", area_id: "wc_chinh" }, state: { entity_id: "binary_sensor.ro_nuoc_wc", state: "off", attributes: { friendly_name: "Cảm biến rò nước", device_class: "moisture" } } },
  { entry: { entity_id: "switch.may_giat", area_id: "lo_gia" }, state: { entity_id: "switch.may_giat", state: "on", attributes: { friendly_name: "Máy giặt" } } },
  // Robot hút bụi số 1 (đặt trong phòng khách)
  { entry: { entity_id: "vacuum.robot_vacuum", area_id: "phong_khach" }, state: { entity_id: "vacuum.robot_vacuum", state: "cleaning", attributes: { friendly_name: "Robot hút bụi", battery_level: 96, battery_last_charged_by: "Bát nạp", status: "Cleaning", features: 1015 } } },
  // Robot hút bụi số 2 (phòng master) – bật chạy sẵn
  { entry: { entity_id: "vacuum.robot_vacuum_2", area_id: "phong_ngu_master" }, state: { entity_id: "vacuum.robot_vacuum_2", state: "cleaning", attributes: { friendly_name: "Robot hút bụi master", battery_level: 82, battery_last_charged_by: "Bát nạp", status: "Cleaning", features: 1015 } } },

  // === B2: thêm thiết bị còn thiếu (đèn, climate, cover, fan, lock, media, sensor, an toàn) ===
  // Đèn bổ sung
  light("master_guong", "Đèn gương phòng master", "phong_ngu_master", true, { brightness: 130, color_temp_kelvin: 3000 }),
  light("wc_chinh_guong", "Đèn gương WC chính", "wc_chinh", true, { brightness: 150, color_temp_kelvin: 3500 }),
  light("phong_lam_viec_ban", "Đèn bàn làm việc", "phong_lam_viec", true, { brightness: 160, color_temp_kelvin: 4000 }),
  light("ban_cong_dai", "Đèn dây ban công", "ban_cong", true, { brightness: 120, color_temp_kelvin: 2700 }),
  light("lo_gia_dai", "Đèn dây lô gia", "lo_gia", true, { brightness: 110, color_temp_kelvin: 2700 }),
  light("nha_bep_hat", "Đèn hắt dưới tủ bếp", "nha_bep", true, { brightness: 200, color_temp_kelvin: 4000 }),
  light("phong_ngu_2_ngu", "Đèn ngủ phòng 2", "phong_ngu_2", false),
  light("phong_ngu_3_ngu", "Đèn ngủ phòng 3", "phong_ngu_3", true, { brightness: 60 }),
  light("hanh_lang_cam_ung", "Đèn cảm ứng hành lang", "hanh_lang", false),
  // Climate bổ sung
  { entry: { entity_id: "climate.phong_ngu_3", area_id: "phong_ngu_3" }, state: { entity_id: "climate.phong_ngu_3", state: "off", attributes: { friendly_name: "Điều hòa phòng ngủ 3", current_temperature: 26.1, temperature: 26, hvac_modes: ["off", "heat", "cool", "auto"], hvac_action: "off", min_temp: 16, max_temp: 32 } } },
  { entry: { entity_id: "climate.nuoc_nong", area_id: "lo_gia" }, state: { entity_id: "climate.nuoc_nong", state: "heat", attributes: { friendly_name: "Máy nước nóng (boiler)", current_temperature: 48, temperature: 55, hvac_modes: ["off", "heat", "heat_cool"], hvac_action: "heating", min_temp: 30, max_temp: 75 } } },
  // Rèm / mành (cover)
  { entry: { entity_id: "cover.rem_master", area_id: "phong_ngu_master" }, state: { entity_id: "cover.rem_master", state: "open", attributes: { friendly_name: "Rèm phòng master", current_position: 70, supported_features: 15 } } },
  { entry: { entity_id: "cover.rem_phong_ngu_2", area_id: "phong_ngu_2" }, state: { entity_id: "cover.rem_phong_ngu_2", state: "closed", attributes: { friendly_name: "Rèm phòng ngủ 2", current_position: 0, supported_features: 15 } } },
  { entry: { entity_id: "cover.rem_ban_cong", area_id: "ban_cong" }, state: { entity_id: "cover.rem_ban_cong", state: "open", attributes: { friendly_name: "Mành ban công", current_position: 100, supported_features: 15 } } },
  { entry: { entity_id: "cover.manh_wc_chinh", area_id: "wc_chinh" }, state: { entity_id: "cover.manh_wc_chinh", state: "closed", attributes: { friendly_name: "Mành WC chính", current_position: 10, supported_features: 15 } } },
  { entry: { entity_id: "cover.rem_lo_gia", area_id: "lo_gia" }, state: { entity_id: "cover.rem_lo_gia", state: "open", attributes: { friendly_name: "Rèm lô gia", current_position: 80, supported_features: 15 } } },
  // Quạt (fan)
  { entry: { entity_id: "fan.quat_tran_phong_khach", area_id: "phong_khach" }, state: { entity_id: "fan.quat_tran_phong_khach", state: "on", attributes: { friendly_name: "Quạt trần phòng khách", percent: 40, preset_mode: "auto", preset_modes: ["off", "auto", "on"], supported_features: 22 } } },
  { entry: { entity_id: "fan.quat_tran_master", area_id: "phong_ngu_master" }, state: { entity_id: "fan.quat_tran_master", state: "off", attributes: { friendly_name: "Quạt trần phòng master", percent: 0, preset_mode: "off", preset_modes: ["off", "auto", "on"], supported_features: 22 } } },
  // Khóa cửa (lock)
  { entry: { entity_id: "lock.cua_ra_vao", area_id: "hanh_lang" }, state: { entity_id: "lock.cua_ra_vao", state: "locked", attributes: { friendly_name: "Khóa cửa thông minh", code_format: "4-8" } } },
  // Thiết bị gia dụng (switch)
  { entry: { entity_id: "switch.may_loc_khong_khi", area_id: "phong_khach" }, state: { entity_id: "switch.may_loc_khong_khi", state: "on", attributes: { friendly_name: "Máy lọc không khí" } } },
  { entry: { entity_id: "switch.quat_hut_bep", area_id: "nha_bep" }, state: { entity_id: "switch.quat_hut_bep", state: "on", attributes: { friendly_name: "Quạt hút mùi bếp" } } },
  { entry: { entity_id: "switch.quat_hut_wc", area_id: "wc_chinh" }, state: { entity_id: "switch.quat_hut_wc", state: "off", attributes: { friendly_name: "Quạt thông gió WC" } } },
  { entry: { entity_id: "switch.nang_chien", area_id: "nha_bep" }, state: { entity_id: "switch.nang_chien", state: "off", attributes: { friendly_name: "Nồi chiên không dầu" } } },
  { entry: { entity_id: "switch.bom_nuoc", area_id: "lo_gia" }, state: { entity_id: "switch.bom_nuoc", state: "on", attributes: { friendly_name: "Bơm nước" } } },
  { entry: { entity_id: "switch.may_say", area_id: "lo_gia" }, state: { entity_id: "switch.may_say", state: "off", attributes: { friendly_name: "Máy sấy quần áo" } } },
  // Âm thanh (media_player)
  { entry: { entity_id: "media_player.soundbar_phong_khach", area_id: "phong_khach" }, state: { entity_id: "media_player.soundbar_phong_khach", state: "playing", attributes: { friendly_name: "Soundbar phòng khách", media_content_type: "music", volume_level: 0.3, is_volume_muted: false } } },
  { entry: { entity_id: "media_player.loa_phong_ngu_2", area_id: "phong_ngu_2" }, state: { entity_id: "media_player.loa_phong_ngu_2", state: "off", attributes: { friendly_name: "Loa phòng ngủ 2" } } },
  { entry: { entity_id: "media_player.loa_ban_cong", area_id: "ban_cong" }, state: { entity_id: "media_player.loa_ban_cong", state: "off", attributes: { friendly_name: "Loa ban công" } } },
  // Camera
  { entry: { entity_id: "camera.ban_cong", area_id: "ban_cong" }, state: { entity_id: "camera.ban_cong", state: "idle", attributes: { friendly_name: "Camera ban công" } } },
  { entry: { entity_id: "camera.nha_bep", area_id: "nha_bep" }, state: { entity_id: "camera.nha_bep", state: "idle", attributes: { friendly_name: "Camera bếp" } } },
  // Chất lượng không khí + nhiệt/ẩm
  { entry: { entity_id: "sensor.phong_khach_co2", area_id: "phong_khach" }, state: { entity_id: "sensor.phong_khach_co2", state: "520", attributes: { friendly_name: "CO2 phòng khách", device_class: "carbon_dioxide", unit_of_measurement: "ppm" } } },
  { entry: { entity_id: "sensor.phong_ngu_master_co2", area_id: "phong_ngu_master" }, state: { entity_id: "sensor.phong_ngu_master_co2", state: "610", attributes: { friendly_name: "CO2 phòng master", device_class: "carbon_dioxide", unit_of_measurement: "ppm" } } },
  { entry: { entity_id: "sensor.phong_ngu_2_thietao", area_id: "phong_ngu_2" }, state: { entity_id: "sensor.phong_ngu_2_thietao", state: "25.3", attributes: { friendly_name: "Nhiệt độ phòng ngủ 2", device_class: "temperature", unit_of_measurement: "°C" } } },
  { entry: { entity_id: "sensor.phong_ngu_3_thietao", area_id: "phong_ngu_3" }, state: { entity_id: "sensor.phong_ngu_3_thietao", state: "25.9", attributes: { friendly_name: "Nhiệt độ phòng ngủ 3", device_class: "temperature", unit_of_measurement: "°C" } } },
  { entry: { entity_id: "sensor.phong_ngu_master_doam", area_id: "phong_ngu_master" }, state: { entity_id: "sensor.phong_ngu_master_doam", state: "55", attributes: { friendly_name: "Độ ẩm phòng master", device_class: "humidity", unit_of_measurement: "%" } } },
  { entry: { entity_id: "sensor.phong_lam_viec_doam", area_id: "phong_lam_viec" }, state: { entity_id: "sensor.phong_lam_viec_doam", state: "47", attributes: { friendly_name: "Độ ẩm phòng làm việc", device_class: "humidity", unit_of_measurement: "%" } } },
  { entry: { entity_id: "sensor.ban_cong_ap_suat", area_id: "ban_cong" }, state: { entity_id: "sensor.ban_cong_ap_suat", state: "1012", attributes: { friendly_name: "Áp suất khí quyển", device_class: "atmospheric_pressure", unit_of_measurement: "hPa" } } },
  // Công suất (power) cho mạch năng lượng
  { entry: { entity_id: "sensor.may_loc_khong_khi_dien", area_id: "phong_khach" }, state: { entity_id: "sensor.may_loc_khong_khi_dien", state: "0.3", attributes: { friendly_name: "Công suất máy lọc không khí", device_class: "power", unit_of_measurement: "kW" } } },
  { entry: { entity_id: "sensor.dieu_hoa_phong_khach_dien", area_id: "phong_khach" }, state: { entity_id: "sensor.dieu_hoa_phong_khach_dien", state: "1.1", attributes: { friendly_name: "Công suất điều hòa phòng khách", device_class: "power", unit_of_measurement: "kW" } } },
  { entry: { entity_id: "sensor.tivi_dien", area_id: "phong_khach" }, state: { entity_id: "sensor.tivi_dien", state: "0.15", attributes: { friendly_name: "Công suất tivi", device_class: "power", unit_of_measurement: "kW" } } },
  { entry: { entity_id: "sensor.tu_lanh_dien", area_id: "nha_bep" }, state: { entity_id: "sensor.tu_lanh_dien", state: "0.2", attributes: { friendly_name: "Công suất tủ lạnh", device_class: "power", unit_of_measurement: "kW" } } },
  { entry: { entity_id: "sensor.may_giat_dien", area_id: "lo_gia" }, state: { entity_id: "sensor.may_giat_dien", state: "0.5", attributes: { friendly_name: "Công suất máy giặt", device_class: "power", unit_of_measurement: "kW" } } },
  // An toàn (binary_sensor)
  { entry: { entity_id: "binary_sensor.khoi_phong_khach", area_id: "phong_khach" }, state: { entity_id: "binary_sensor.khoi_phong_khach", state: "off", attributes: { friendly_name: "Cảm biến khói phòng khách", device_class: "smoke" } } },
  { entry: { entity_id: "binary_sensor.khoi_master", area_id: "phong_ngu_master" }, state: { entity_id: "binary_sensor.khoi_master", state: "off", attributes: { friendly_name: "Cảm biến khói phòng master", device_class: "smoke" } } },
  { entry: { entity_id: "binary_sensor.ro_nuoc_bep", area_id: "nha_bep" }, state: { entity_id: "binary_sensor.ro_nuoc_bep", state: "off", attributes: { friendly_name: "Cảm biến rò nước bếp", device_class: "moisture" } } },
  { entry: { entity_id: "binary_sensor.gas_bep", area_id: "nha_bep" }, state: { entity_id: "binary_sensor.gas_bep", state: "off", attributes: { friendly_name: "Cảm biến gas bếp", device_class: "gas" } } },

  // Thời tiết + mặt trời
  { entry: { entity_id: "weather.vietnam", area_id: null }, state: { entity_id: "weather.vietnam", state: "rainy", attributes: { friendly_name: "Thời tiết", cloud_coverage: 60, wind_speed: 12, wind_speed_unit: "km/h" } } },
  { entry: { entity_id: "sun.sun", area_id: null }, state: { entity_id: "sun.sun", state: "above_horizon", attributes: { friendly_name: "Mặt trời", elevation: 45, azimuth: 180 } } },
];

// Export cho preview (theo đúng HomeAssistant: object index theo entity_id)
export const DEMO_ENTITIES = Object.fromEntries(DEVICES.map((d) => [d.entry.entity_id, d.entry]));
export const DEMO_STATES = Object.fromEntries(DEVICES.map((d) => [d.state.entity_id, d.state]));

// Ánh sáng + thiết bị đặt trong phòng
DEMO_BUILDING.floors[0].placements = [
  // Phòng ngủ master
  place("light.master_decke", 2.2, 2.2),
  { entity_id: "light.master_tranh", x: 0.35, z: 1.6, y: null, mount: "wall" },
  { entity_id: "climate.master", x: 2.2, z: 0.35, y: null, mount: "wall" },
  // WC riêng master
  place("light.wc_master_decke", 5.25, 1.0),
  // Phòng ngủ 3
  place("light.phong_ngu_3_decke", 7.25, 2.0),
  // Phòng ngủ 2
  place("light.phong_ngu_2_decke", 10.75, 2.0),
  { entity_id: "climate.phong_ngu_2", x: 12.5, z: 0.35, y: null, mount: "wall" },
  // Phòng khách
  place("light.phong_khach_decke", 2.2, 6.5),
  { entity_id: "light.stehlampe", x: 4.0, z: 8.6, y: null, mount: "floor" },
  { entity_id: "climate.phong_khach", x: 2.2, z: 4.7, y: null, mount: "wall" },
  { entity_id: "media_player.tivi_phongkhach", x: 4.3, z: 6.5, y: null, mount: "wall" },
  { entity_id: "cover.rèm_phong_khach", x: 0.3, z: 6.5, y: null, mount: "wall" },
  // Phòng ăn
  { entity_id: "light.phong_an_pendant", x: 7.75, z: 5.75, y: null, mount: "ceiling" },
  // Lô gia
  place("light.lo_gia_decke", 11.75, 5.75),
  { entity_id: "switch.may_giat", x: 10.8, z: 4.9 },
  // Phòng làm việc
  place("light.phong_lam_viec_decke", 11.75, 9.0),
  // Nhà bếp
  place("light.nha_bep_decke", 1.25, 10.2),
  { entity_id: "switch.kaffeemaschine", x: 0.35, z: 11.3 },
  { entity_id: "binary_sensor.khoi_bep", x: 1.25, z: 9.3, y: null, mount: "ceiling" },
  // WC chính
  place("light.wc_chinh_decke", 3.25, 10.2),
  { entity_id: "binary_sensor.ro_nuoc_wc", x: 3.2, z: 11.1 },
  // Hành lang
  place("light.hanh_lang_decke", 7.0, 10.2),
  { entity_id: "camera.hanh_lang", x: 10.1, z: 11.2, y: null, mount: "wall", rotation: 135 },
  { entity_id: "binary_sensor.cua_ra_vao", x: 5.5, z: 11.2 },
  { entity_id: "binary_sensor.cua_soo_bep", x: 0.3, z: 10.2, y: null, mount: "wall" },
  // Ban công
  place("light.ban_cong", 2.25, -0.75),
  // Thiết bị "ẩn" (không cần vị trí trong nhà)
  { entity_id: "sensor.phong_khach_nhietao", x: 0, z: 0 },
  { entity_id: "sensor.phong_khach_doam", x: 0, z: 0 },
  { entity_id: "sensor.nha_bep_dien", x: 0, z: 0 },
  // B2: vị trí 3D cho thiết bị bổ sung
  { entity_id: "light.master_guong", x: 0.4, z: 1.0, y: null, mount: "wall" },
  { entity_id: "light.wc_chinh_guong", x: 3.2, z: 9.15, y: null, mount: "wall" },
  { entity_id: "light.phong_lam_viec_ban", x: 12.55, z: 8.7, y: null, mount: "wall" },
  { entity_id: "light.ban_cong_dai", x: 0.8, z: -0.9, y: null, mount: "ceiling" },
  { entity_id: "light.lo_gia_dai", x: 11.2, z: 5.0, y: null, mount: "ceiling" },
  { entity_id: "light.nha_bep_hat", x: 1.25, z: 9.2, y: null, mount: "wall" },
  { entity_id: "light.phong_ngu_2_ngu", x: 9.55, z: 0.5, y: null, mount: "floor" },
  { entity_id: "light.phong_ngu_3_ngu", x: 6.3, z: 0.5, y: null, mount: "floor" },
  { entity_id: "light.hanh_lang_cam_ung", x: 4.6, z: 9.5, y: null, mount: "ceiling" },
  { entity_id: "climate.phong_ngu_3", x: 6.3, z: 4.2, y: null, mount: "wall" },
  { entity_id: "climate.nuoc_nong", x: 12.6, z: 6.7, y: null, mount: "wall" },
  { entity_id: "cover.rem_master", x: 0.25, z: 2.2, y: null, mount: "wall" },
  { entity_id: "cover.rem_phong_ngu_2", x: 12.85, z: 4.2, y: null, mount: "wall" },
  { entity_id: "cover.rem_ban_cong", x: 2.2, z: -0.1, y: null, mount: "wall" },
  { entity_id: "cover.manh_wc_chinh", x: 3.0, z: 11.35, y: null, mount: "wall" },
  { entity_id: "cover.rem_lo_gia", x: 12.85, z: 5.7, y: null, mount: "wall" },
  { entity_id: "fan.quat_tran_phong_khach", x: 2.25, z: 6.75, y: null, mount: "ceiling" },
  { entity_id: "fan.quat_tran_master", x: 3.1, z: 2.4, y: null, mount: "ceiling" },
  { entity_id: "lock.cua_ra_vao", x: 5.5, z: 11.4, y: null, mount: "wall" },
  { entity_id: "switch.may_loc_khong_khi", x: 0.4, z: 5.4 },
  { entity_id: "switch.quat_hut_bep", x: 1.25, z: 9.15, y: null, mount: "ceiling" },
  { entity_id: "switch.quat_hut_wc", x: 3.25, z: 9.15, y: null, mount: "ceiling" },
  { entity_id: "switch.nang_chien", x: 0.4, z: 10.4 },
  { entity_id: "switch.bom_nuoc", x: 12.6, z: 6.5 },
  { entity_id: "switch.may_say", x: 12.2, z: 4.9 },
  { entity_id: "media_player.soundbar_phong_khach", x: 4.3, z: 6.9, y: null, mount: "wall" },
  { entity_id: "media_player.loa_phong_ngu_2", x: 12.8, z: 4.3, y: null, mount: "wall" },
  { entity_id: "media_player.loa_ban_cong", x: 2.2, z: -1.3 },
  { entity_id: "camera.ban_cong", x: 4.2, z: -1.2, y: null, mount: "ceiling", rotation: 135 },
  { entity_id: "camera.nha_bep", x: 2.3, z: 9.2, y: null, mount: "ceiling", rotation: 225 },
  { entity_id: "sensor.phong_khach_co2", x: 2.25, z: 5.0, y: null, mount: "ceiling" },
  { entity_id: "sensor.phong_ngu_master_co2", x: 3.8, z: 0.4, y: null, mount: "wall" },
  { entity_id: "sensor.phong_ngu_2_thietao", x: 8.7, z: 0.4, y: null, mount: "wall" },
  { entity_id: "sensor.phong_ngu_3_thietao", x: 8.3, z: 0.4, y: null, mount: "wall" },
  { entity_id: "sensor.phong_ngu_master_doam", x: 4.3, z: 0.4, y: null, mount: "wall" },
  { entity_id: "sensor.phong_lam_viec_doam", x: 10.6, z: 8.0, y: null, mount: "wall" },
  { entity_id: "sensor.ban_cong_ap_suat", x: 0.4, z: -1.2, y: null, mount: "wall" },
  { entity_id: "sensor.may_loc_khong_khi_dien", x: 0.4, z: 5.4 },
  { entity_id: "sensor.dieu_hoa_phong_khach_dien", x: 2.2, z: 4.7, y: null, mount: "wall" },
  { entity_id: "sensor.tivi_dien", x: 4.3, z: 6.5, y: null, mount: "wall" },
  { entity_id: "sensor.tu_lanh_dien", x: 2.15, z: 9.45 },
  { entity_id: "sensor.may_giat_dien", x: 10.85, z: 4.9 },
  { entity_id: "binary_sensor.khoi_phong_khach", x: 1.5, z: 5.0, y: null, mount: "ceiling" },
  { entity_id: "binary_sensor.khoi_master", x: 2.2, z: 3.6, y: null, mount: "ceiling" },
  { entity_id: "binary_sensor.ro_nuoc_bep", x: 1.2, z: 11.3 },
  { entity_id: "binary_sensor.gas_bep", x: 2.2, z: 9.2, y: null, mount: "wall" },
];

// Đồ nội thất đầy đủ cho căn hộ (type = loại nội thất built-in của app)
DEMO_BUILDING.floors[0].furniture = [
  // Phòng ngủ master (0-4.5 x 0-4.5)
  { id: "m1", type: "bed", x: 1.3, z: 1.45, rotation: 0, w: 1.6, d: 2.05, h: 0.9, variant: null },
  { id: "m2", type: "nightstand", x: 0.28, z: 1.2, rotation: 0, w: 0.45, d: 0.4, h: 0.5, variant: null },
  { id: "m3", type: "nightstand", x: 2.45, z: 1.2, rotation: 0, w: 0.45, d: 0.4, h: 0.5, variant: null },
  { id: "m4", type: "wardrobe", x: 2.4, z: 4.15, rotation: 0, w: 1.8, d: 0.6, h: 2.1, variant: null },
  { id: "m5", type: "rug", x: 1.5, z: 3.2, rotation: 0, w: 2.0, d: 1.4, h: 0.01, variant: null },
  { id: "m6", type: "plant", x: 4.0, z: 0.55, rotation: 0, w: 0.45, d: 0.45, h: 1.1, variant: null },
  // WC riêng master (4.5-6 x 0-2.5)
  { id: "wm1", type: "wc", x: 5.25, z: 0.45, rotation: 0, w: 0.38, d: 0.6, h: 0.8, variant: null },
  { id: "wm2", type: "washbasin", x: 5.0, z: 2.0, rotation: 0, w: 0.6, d: 0.46, h: 0.85, variant: null },
  // Phòng ngủ 3 (6-8.5 x 0-4.5)
  { id: "b31", type: "bed", x: 6.6, z: 2.0, rotation: 0, w: 1.0, d: 2.05, h: 0.9, variant: null },
  { id: "b32", type: "desk", x: 7.5, z: 0.5, rotation: 0, w: 1.4, d: 0.7, h: 0.75, variant: null },
  { id: "b33", type: "office_chair", x: 7.5, z: 1.3, rotation: 0, w: 0.65, d: 0.65, h: 1.1, variant: null },
  { id: "b34", type: "wardrobe", x: 7.6, z: 4.1, rotation: 0, w: 1.8, d: 0.6, h: 2.1, variant: null },
  { id: "b35", type: "nightstand", x: 6.25, z: 0.55, rotation: 0, w: 0.45, d: 0.4, h: 0.5, variant: null },
  // Phòng ngủ 2 (8.5-13 x 0-4.5)
  { id: "b21", type: "bed", x: 10.6, z: 1.45, rotation: 0, w: 1.6, d: 2.05, h: 0.9, variant: null },
  { id: "b22", type: "nightstand", x: 9.5, z: 1.2, rotation: 0, w: 0.45, d: 0.4, h: 0.5, variant: null },
  { id: "b23", type: "nightstand", x: 11.7, z: 1.2, rotation: 0, w: 0.45, d: 0.4, h: 0.5, variant: null },
  { id: "b24", type: "wardrobe", x: 12.65, z: 2.5, rotation: 90, w: 1.8, d: 0.6, h: 2.1, variant: null },
  { id: "b25", type: "dresser", x: 11.6, z: 4.15, rotation: 0, w: 1.0, d: 0.5, h: 0.9, variant: null },
  { id: "b26", type: "plant", x: 9.0, z: 0.5, rotation: 0, w: 0.45, d: 0.45, h: 1.1, variant: null },
  // Phòng khách (0-4.5 x 4.5-9)
  { id: "l1", type: "sofa", x: 0.55, z: 6.5, rotation: 270, w: 2.2, d: 0.9, h: 0.82, variant: null },
  { id: "l2", type: "armchair", x: 3.2, z: 5.3, rotation: 135, w: 0.85, d: 0.85, h: 0.8, variant: null },
  { id: "l3", type: "coffee_table", x: 1.7, z: 6.5, rotation: 0, w: 1.1, d: 0.6, h: 0.42, variant: null },
  { id: "l4", type: "tv_board", x: 4.25, z: 6.5, rotation: 90, w: 1.8, d: 0.42, h: 0.5, variant: null },
  { id: "l5", type: "sideboard", x: 1.5, z: 4.85, rotation: 0, w: 1.6, d: 0.45, h: 0.8, variant: null },
  { id: "l6", type: "rug", x: 1.7, z: 6.5, rotation: 0, w: 2.0, d: 1.4, h: 0.01, variant: null },
  { id: "l7", type: "lamp_floor", x: 4.0, z: 8.6, rotation: 0, w: 0.4, d: 0.4, h: 1.7, variant: null },
  { id: "l8", type: "plant", x: 4.1, z: 4.9, rotation: 0, w: 0.45, d: 0.45, h: 1.1, variant: null },
  // Phòng ăn (6-9.5 x 4.5-7)
  { id: "d1", type: "table", x: 7.75, z: 5.75, rotation: 0, w: 1.6, d: 0.9, h: 0.75, variant: null },
  { id: "d2", type: "chair", x: 7.0, z: 5.2, rotation: 0, w: 0.46, d: 0.5, h: 0.9, variant: null },
  { id: "d3", type: "chair", x: 8.5, z: 5.2, rotation: 0, w: 0.46, d: 0.5, h: 0.9, variant: null },
  { id: "d4", type: "chair", x: 7.0, z: 6.3, rotation: 180, w: 0.46, d: 0.5, h: 0.9, variant: null },
  { id: "d5", type: "chair", x: 8.5, z: 6.3, rotation: 180, w: 0.46, d: 0.5, h: 0.9, variant: null },
  // Lô gia (10.5-13 x 4.5-7)
  { id: "lg1", type: "washer", x: 10.85, z: 4.9, rotation: 0, w: 0.6, d: 0.6, h: 0.85, variant: null },
  { id: "lg2", type: "plant", x: 10.8, z: 6.4, rotation: 0, w: 0.45, d: 0.45, h: 1.1, variant: null },
  { id: "lg3", type: "plant", x: 11.6, z: 6.5, rotation: 0, w: 0.45, d: 0.45, h: 1.1, variant: null },
  { id: "lg4", type: "stool", x: 12.0, z: 5.6, rotation: 0, w: 0.55, d: 0.55, h: 0.42, variant: null },
  // Phòng làm việc (10.5-13 x 7-11)
  { id: "w1", type: "desk", x: 12.6, z: 9.0, rotation: 90, w: 1.4, d: 0.7, h: 0.75, variant: null },
  { id: "w2", type: "office_chair", x: 11.9, z: 9.0, rotation: 90, w: 0.65, d: 0.65, h: 1.1, variant: null },
  { id: "w3", type: "tall_cabinet", x: 10.9, z: 7.6, rotation: 0, w: 0.6, d: 0.6, h: 2.1, variant: null },
  { id: "w4", type: "shelf", x: 11.9, z: 7.3, rotation: 0, w: 0.9, d: 0.35, h: 1.9, variant: null },
  { id: "w5", type: "plant", x: 12.6, z: 10.5, rotation: 0, w: 0.45, d: 0.45, h: 1.1, variant: null },
  // Nhà bếp (0-2.5 x 9-11.5)
  { id: "k1", type: "kitchen", x: 0.38, z: 10.25, rotation: 270, w: 2.4, d: 0.62, h: 0.92, variant: null },
  { id: "k2", type: "fridge", x: 2.15, z: 9.45, rotation: 90, w: 0.6, d: 0.65, h: 1.8, variant: null },
  { id: "k3", type: "sink", x: 1.2, z: 11.15, rotation: 180, w: 0.9, d: 0.62, h: 0.92, variant: null },
  { id: "k4", type: "stove", x: 2.0, z: 11.15, rotation: 180, w: 0.6, d: 0.62, h: 0.92, variant: null },
  // WC chính (2.5-4 x 9-11.5)
  { id: "wc1", type: "wc", x: 3.4, z: 9.45, rotation: 0, w: 0.38, d: 0.6, h: 0.8, variant: null },
  { id: "wc2", type: "washbasin", x: 2.9, z: 11.2, rotation: 0, w: 0.6, d: 0.46, h: 0.85, variant: null },
  { id: "wc3", type: "washer", x: 3.6, z: 11.1, rotation: 0, w: 0.6, d: 0.6, h: 0.85, variant: null },
  // Hành lang (mạch L)
  { id: "h1", type: "coat_rack", x: 4.7, z: 11.25, rotation: 180, w: 1.0, d: 0.35, h: 1.9, variant: null },
  { id: "h2", type: "bench", x: 7.5, z: 11.2, rotation: 180, w: 1.4, d: 0.45, h: 0.85, variant: null },
  { id: "h3", type: "plant", x: 10.0, z: 9.6, rotation: 0, w: 0.45, d: 0.45, h: 1.1, variant: null },
  { id: "h4", type: "tall_cabinet", x: 10.2, z: 10.7, rotation: 0, w: 0.6, d: 0.6, h: 2.1, variant: null },
  // Robot hút bụi số 1 (dock trong phòng khách)
  { id: "rv1", type: "robot_vacuum", x: 0.2, z: 8.5, rotation: 270, w: 0.36, d: 0.5, h: 0.1, variant: null, entity: "vacuum.robot_vacuum" },
  // Robot hút bụi số 2 (dock trong phòng master)
  { id: "rv2", type: "robot_vacuum", x: 4.1, z: 2.3, rotation: 90, w: 0.36, d: 0.5, h: 0.1, variant: null, entity: "vacuum.robot_vacuum_2" },
  // Ban công (0-4.5 x -1.5-0)
  { id: "bc1", type: "plant", x: 0.6, z: -0.8, rotation: 0, w: 0.45, d: 0.45, h: 1.1, variant: null },
  { id: "bc2", type: "armchair", x: 2.0, z: -0.85, rotation: 0, w: 0.85, d: 0.85, h: 0.8, variant: null },
  { id: "bc3", type: "plant", x: 3.8, z: -0.8, rotation: 0, w: 0.45, d: 0.45, h: 1.1, variant: null },
  { id: "bc4", type: "table_round", x: 1.0, z: -0.85, rotation: 0, w: 0.7, d: 0.7, h: 0.75, variant: null },
  // B2: máy sấy (loggia)
  { id: "lg5", type: "dryer", x: 12.2, z: 4.9, rotation: 0, w: 0.6, d: 0.6, h: 0.9, variant: null, entity: "switch.may_say" },
];

// Pack đồ nội thất demo (tương thích định dạng fp3dpack) – giữ cho demo shop
export const DEMO_PACK = {
  format: "fp3dpack",
  version: 1,
  id: "demo.apartment.vn",
  name: "Nội thất chung cư VN (Demo)",
  publisher: "Demo VN",
  licensee: null,
  items: [
    {
      id: "downlight",
      name: { vi: "Đèn downlight", en: "Downlight" },
      size: [0.15, 0.15, 0.05],
      parts: [{ shape: "box", x: 0, z: 0, w: 0.15, d: 0.15, y: 0, h: 0.05, color: "white", color_mode: "emissive" }],
    },
  ],
};
