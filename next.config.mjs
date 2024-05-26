import withBundleAnalyzer from '@next/bundle-analyzer';

const shouldAnalyzeBundles = process.env.ANALYZE === 'true';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: shouldAnalyzeBundles,
  openAnalyzer: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default bundleAnalyzer(nextConfig);
