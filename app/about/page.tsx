import { Link } from '@nextui-org/link';

import { Page } from '@/components/layout/Page';

export default function AboutPage() {
  return (
    <Page heading="About">
      <div className="stack">
        Demos:
        <Link href="/">SSR/RSC/SA</Link> /<Link href="/rtk">CSR/RTK (queries & mutations)</Link>
      </div>
    </Page>
  );
}
