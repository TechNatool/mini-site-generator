export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}

export default function FeatureCard({ icon, title, description, badge }: FeatureCardProps) {
  return (
    <div className="relative bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100 group">
      {badge && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {badge}
          </span>
        </div>
      )}

      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg mb-4 group-hover:scale-110 transition-transform">
        <div className="text-white">
          {icon}
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
