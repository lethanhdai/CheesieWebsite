import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Phase 08: Technical SEO & Google Search Optimization', () => {
  const indexHtmlPath = path.resolve(__dirname, '../../../index.html');
  const robotsTxtPath = path.resolve(__dirname, '../../../public/robots.txt');
  const sitemapXmlPath = path.resolve(__dirname, '../../../public/sitemap.xml');
  const ogImagePath = path.resolve(__dirname, '../../../public/assets/og-image.jpg');
  const faviconPath = path.resolve(__dirname, '../../../public/favicon.svg');

  it('xác thực title, description, canonical và robots meta trong index.html', () => {
    const html = fs.readFileSync(indexHtmlPath, 'utf-8');

    // 1. Browser title chính xác
    expect(html).toContain('<title>Cheesie - Tacos and Burger</title>');

    // 2. Meta description chuẩn
    const expectedDesc =
      'Cheesie tại 102 Lê Lai, Ninh Kiều, Cần Thơ. Khám phá tacos Pháp tự chọn nhân, sốt, burger, gà tender, mì Ý và menu các món ngon nhà Cheesie.';
    expect(html).toContain(`content="${expectedDesc}"`);

    // 3. Canonical URL tuyệt đối
    expect(html).toContain('<link rel="canonical" href="https://cheesiewebsite.vercel.app/" />');

    // 4. Ngôn ngữ tiếng Việt & mã hóa UTF-8
    expect(html).toContain('<html lang="vi">');
    expect(html).toContain('<meta charset="UTF-8" />');

    // 5. Theme color nhận diện thương hiệu Cheesie
    expect(html).toContain('<meta name="theme-color" content="#6A1B20" />');

    // 6. Robots directive đầy đủ
    expect(html).toContain('name="robots"');
    expect(html).toContain('index, follow');
  });

  it('xác thực Open Graph và Twitter card metadata chuẩn 1200x630', () => {
    const html = fs.readFileSync(indexHtmlPath, 'utf-8');

    // Open Graph
    expect(html).toContain('<meta property="og:type" content="website" />');
    expect(html).toContain('<meta property="og:title" content="Cheesie - Tacos and Burger" />');
    expect(html).toContain('<meta property="og:site_name" content="Cheesie - Tacos and Burger" />');
    expect(html).toContain('<meta property="og:url" content="https://cheesiewebsite.vercel.app/" />');
    expect(html).toContain('<meta property="og:locale" content="vi_VN" />');
    expect(html).toContain('<meta\n      property="og:image"\n      content="https://cheesiewebsite.vercel.app/assets/og-image.jpg"\n    />');
    expect(html).toContain('<meta property="og:image:width" content="1200" />');
    expect(html).toContain('<meta property="og:image:height" content="630" />');

    // Twitter
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image" />');
    expect(html).toContain('<meta name="twitter:title" content="Cheesie - Tacos and Burger" />');
    expect(html).toContain('<meta\n      name="twitter:image"\n      content="https://cheesiewebsite.vercel.app/assets/og-image.jpg"\n    />');
  });

  it('xác thực JSON-LD Restaurant Schema cấu trúc chuẩn schema.org', () => {
    const html = fs.readFileSync(indexHtmlPath, 'utf-8');
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(jsonLdMatch).not.toBeNull();

    const jsonLd = JSON.parse(jsonLdMatch![1]);
    expect(jsonLd['@context']).toBe('https://schema.org');
    expect(jsonLd['@type']).toBe('Restaurant');
    expect(jsonLd.name).toBe('Cheesie - Tacos and Burger');
    expect(jsonLd.url).toBe('https://cheesiewebsite.vercel.app/');
    expect(jsonLd.telephone).toBe('+84788786283');
    expect(jsonLd.email).toBe('cheesieburgersandtacos@gmail.com');
    expect(jsonLd.hasMenu).toBe('https://cheesiewebsite.vercel.app/#menu');

    // Address
    expect(jsonLd.address['@type']).toBe('PostalAddress');
    expect(jsonLd.address.streetAddress).toBe('102 Đường Lê Lai');
    expect(jsonLd.address.addressLocality).toBe('Ninh Kiều');
    expect(jsonLd.address.addressRegion).toBe('Cần Thơ');
    expect(jsonLd.address.addressCountry).toBe('VN');

    // Cuisines
    expect(jsonLd.servesCuisine).toContain('Tacos Pháp');
    expect(jsonLd.servesCuisine).toContain('Burger');
    expect(jsonLd.servesCuisine).toContain('Gà tender');

    // sameAs profiles
    expect(jsonLd.sameAs).toContain('https://www.facebook.com/profile.php?id=61560992384243');
    expect(jsonLd.sameAs).toContain('https://shopeefood.vn/can-tho/cheesie-tacos-burger-le-lai');
    expect(jsonLd.sameAs).toContain(
      'https://food.grab.com/vn/vi/restaurant/cheesie-l%C3%AA-lai-delivery/5-C72BC3LUTTU3G2'
    );
  });

  it('xác thực robots.txt và sitemap.xml hợp lệ', () => {
    expect(fs.existsSync(robotsTxtPath)).toBe(true);
    const robots = fs.readFileSync(robotsTxtPath, 'utf-8');
    expect(robots).toContain('User-agent: *');
    expect(robots).toContain('Allow: /');
    expect(robots).toContain('Sitemap: https://cheesiewebsite.vercel.app/sitemap.xml');

    expect(fs.existsSync(sitemapXmlPath)).toBe(true);
    const sitemap = fs.readFileSync(sitemapXmlPath, 'utf-8');
    expect(sitemap).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(sitemap).toContain('<loc>https://cheesiewebsite.vercel.app/</loc>');
  });

  it('xác thực assets og-image và favicon tồn tại với kích thước hợp lệ', () => {
    expect(fs.existsSync(ogImagePath)).toBe(true);
    const ogStats = fs.statSync(ogImagePath);
    expect(ogStats.size).toBeGreaterThan(10000); // Tối thiểu 10KB
    expect(ogStats.size).toBeLessThan(300000); // Dưới 300KB chuẩn web performance

    expect(fs.existsSync(faviconPath)).toBe(true);
    const faviconContent = fs.readFileSync(faviconPath, 'utf-8');
    expect(faviconContent).toContain('<svg');
  });

  it('xác thực nội dung HTML sơ khởi (prerendered crawlable shell) giúp bot lập chỉ mục không cần JS', () => {
    const html = fs.readFileSync(indexHtmlPath, 'utf-8');
    // Chứa thông tin cốt lõi ngay trong DOM #root trước khi React hydrate
    expect(html).toContain('<h1>Đói rồi? Cuốn thôi.</h1>');
    expect(html).toContain('102 Đường Lê Lai, Quận Ninh Kiều, TP. Cần Thơ');
    expect(html).toContain('078 878 6283');
    expect(html).toContain('Tacos Pháp');
    expect(html).toContain('Burger bò phô mai');
    expect(html).toContain('Gà tender 1 sốt (6 viên)');
    expect(html).toContain('Mì Ý kem Tomyum');
    expect(html).toContain('Combo Best Seller Nhà Cheesie');
  });
});
