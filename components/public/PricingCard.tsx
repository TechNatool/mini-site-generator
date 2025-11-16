import Link from 'next/link';

export interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
  ctaLink: string;
}

export default function PricingCard({
  name,
  price,
  period,
  description,
  features,
  highlighted = false,
  cta,
  ctaLink,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-8 ${
        highlighted
          ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl scale-105'
          : 'bg-white text-gray-900 shadow-lg border border-gray-200'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-5 left-0 right-0 flex justify-center">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
            Plus populaire
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-gray-900'}`}>
          {name}
        </h3>
        <p className={`text-sm ${highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>

      <div className="text-center mb-8">
        <div className="flex items-baseline justify-center">
          <span className={`text-5xl font-extrabold ${highlighted ? 'text-white' : 'text-gray-900'}`}>
            {price}
          </span>
          <span className={`ml-2 text-lg ${highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
            {period}
          </span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className={`w-6 h-6 mr-3 flex-shrink-0 ${
                highlighted ? 'text-blue-200' : 'text-blue-600'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className={highlighted ? 'text-blue-50' : 'text-gray-700'}>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={ctaLink}
        className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all ${
          highlighted
            ? 'bg-white text-blue-700 hover:bg-blue-50 shadow-lg'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}
