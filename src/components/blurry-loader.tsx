import LoadingCircle from "@/components/icons/loading-circle";

export default function BlurryLoader({ shouldShow }) {
  return (
    shouldShow && (
      <tr>
        <th className="absolute inset-0 z-30 bg-gray-100 bg-opacity-10 backdrop-blur"></th>
        <th className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 transform">
          <LoadingCircle dimensions="w-10 h-10" />
        </th>
      </tr>
    )
  );
}
