import { useTheme } from '../../context/theme';

export function BrandLockup({ size = 'nav', darkSurface = false }: { size?: 'nav' | 'footer'; darkSurface?: boolean }) {
  const { isDark } = useTheme();
  const useDarkArtwork = darkSurface || isDark;
  return <span className={`brand-lockup brand-lockup--${size}`}>
    <img src={`/brand/maha-dev/maha-dev-horizontal-${useDarkArtwork ? 'oscuro' : 'claro'}.svg`} alt="MAHA DEV" width="870" height="102" />
  </span>;
}