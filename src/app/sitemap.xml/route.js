export async function getServerSideProps({ res }) {
  const baseUrl = "https://readgro.com";
  const backendUrl = "https://readgro-backend.onrender.com"; // Replace with your backend domain

  // Fetch courses with course_id
  const coursesRes = await fetch(`${backendUrl}/getspecific_course/courses-ids`);
  const courses = coursesRes.ok ? await coursesRes.json() : [];

  // Fetch packages with package_id
  const packagesRes = await fetch(`${backendUrl}/getpackage/packages-ids`);
  const packages = packagesRes.ok ? await packagesRes.json() : [];

  const staticPaths = [
    "",
    "about",
    "contact",
    "courses",
    "packages"
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add static pages
  staticPaths.forEach(path => {
    sitemap += `<url><loc>${baseUrl}/${path}</loc></url>\n`;
  });

  // Add dynamic course pages using course_id
  courses.forEach(course => {
    sitemap += `<url><loc>${baseUrl}/courses/${course.course_id}</loc></url>\n`;
  });

  // Add dynamic package pages using package_id
  packages.forEach(pkg => {
    sitemap += `<url><loc>${baseUrl}/packages/${pkg.package_id}</loc></url>\n`;
  });

  sitemap += `</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
