import { Music, Dumbbell, Palette, Code, Camera, Sparkles, Trophy, Gamepad2 } from 'lucide-react';
import PageHeader from './PageHeader';

interface ExploreScreenProps {
  onBack?: () => void;
}

export default function ExploreScreen({ onBack }: ExploreScreenProps) {
  const tiles = [
    { title: 'Art Classes', subtitle: 'Express yourself', icon: Palette, size: 'large', color: '#B6D6CC' },
    { title: 'Football Academy', subtitle: 'Build strength', icon: Trophy, size: 'medium', color: '#74A4BC' },
    { title: 'Dance Studio', subtitle: 'Move with rhythm', icon: Music, size: 'medium', color: '#B6D6CC' },
    { title: 'Coding for Kids', subtitle: 'Future ready', icon: Code, size: 'large', color: '#74A4BC' },
    { title: 'Yoga Nearby', subtitle: 'Find balance', icon: Dumbbell, size: 'small', color: '#B6D6CC' },
    { title: 'Piano Trial', subtitle: 'First class free', icon: Music, size: 'small', color: '#74A4BC' },
    { title: 'Weekend Workshops', subtitle: 'Learn something new', icon: Sparkles, size: 'medium', color: '#B6D6CC' },
    { title: 'Trending Camps', subtitle: 'Summer specials', icon: Gamepad2, size: 'medium', color: '#74A4BC' },
    { title: 'Photography', subtitle: 'Capture moments', icon: Camera, size: 'large', color: '#B6D6CC' },
    { title: 'Swimming', subtitle: 'Dive in', icon: Dumbbell, size: 'small', color: '#74A4BC' }
  ];

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2 h-80';
      case 'medium':
        return 'col-span-1 row-span-2 h-80';
      case 'small':
        return 'col-span-1 row-span-1 h-36';
      default:
        return 'col-span-1 row-span-1 h-36';
    }
  };

  return (
    <div className="flex-1 overflow-auto pb-28" style={{ backgroundColor: '#F4FAF8' }}>
      <PageHeader showBack={true} onBack={onBack} title="Explore" />

      {/* Content Spacing */}
      <div style={{ paddingTop: '12px', paddingBottom: '8px' }}></div>

      {/* Mosaic Grid */}
      <div style={{ paddingTop: '24px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '20px' }}>
        <div className="grid grid-cols-2 gap-4 auto-rows-auto">
          {tiles.map((tile, index) => {
            const IconComponent = tile.icon;
            return (
              <div
                key={index}
                className={`${getSizeClass(tile.size)} p-5 flex flex-col justify-between cursor-pointer`}
                style={{
                  backgroundColor: tile.color,
                  borderRadius: '28px',
                  boxShadow: '0 12px 30px rgba(17,19,24,0.08)',
                  transition: 'transform 0.2s'
                }}
              >
                <div>
                  <IconComponent
                    size={tile.size === 'large' ? 32 : tile.size === 'medium' ? 28 : 24}
                    style={{ color: '#FFFFFF', opacity: 0.95, marginBottom: '12px' }}
                  />
                </div>
                <div>
                  <h3 style={{
                    fontSize: tile.size === 'large' ? '22px' : tile.size === 'medium' ? '18px' : '16px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    marginBottom: '6px',
                    lineHeight: '1.2'
                  }}>
                    {tile.title}
                  </h3>
                  <p style={{
                    fontSize: tile.size === 'large' ? '14px' : '13px',
                    color: '#FFFFFF',
                    opacity: 0.9,
                    fontWeight: 400
                  }}>
                    {tile.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
