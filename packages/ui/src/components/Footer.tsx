export interface FooterProps {
  year?: number;
}

export function Footer({ year = new Date().getFullYear() }: FooterProps) {
  return (
    <footer className="mt-12 border-t border-neutral-400 px-6 py-8 text-sm text-neutral-500">
      © {year} Go Champs
    </footer>
  );
}
