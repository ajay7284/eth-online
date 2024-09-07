import { CircleDollarSign, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const OperatorInfo = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <nav className="text-sm mb-6">
          <Link href="#" className="text-gray-400 hover:text-gray-200">
            Overview
          </Link>{" "}
          /{" "}
          <Link href="#" className="text-gray-400 hover:text-gray-200">
            Operators
          </Link>{" "}
          / <span className="text-gray-500">1056</span>
        </nav>

        <div className="flex items-center gap-4 mb-8">
          <Image
            src="/placeholder.svg"
            alt="Lido logo"
            width={48}
            height={48}
            className="rounded-full"
          />
          <h1 className="text-4xl font-bold">Lido - Encapsulate</h1>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <InfoItem
                label="Description"
                value="Others trust we validate! Your stake is important to us Help us secure networks while you earn rewards"
              />
              <InfoItem label="Location" value="Singapore" />
              <InfoItem label="Eth1 node client" value="Nethermind" />
              <InfoItem label="Eth2 node client" value="Lighthouse" />
              <InfoItem
                label="MEV relays"
                value="Aestus,Agnostic Gnosis,bloXroute Max Profit,bloXroute Regulated,Eden Network,Flashbots,Manifold,Ultra Sound"
              />
            </div>
            <div>
              <InfoItem label="Website" value="https://encapsulate.xyz" link />
              <InfoItem
                label="Twitter"
                value="https://x.com/encapsulate_xyz"
                link
              />
              <InfoItem
                label="Linkedin"
                value="https://www.linkedin.com/company/encapsulate-xyz"
                link
              />
              <InfoItem label="Owner" value="0x1007...8262" />
              <InfoItem label="Public Key" value="LS0tLS1CRUdJTiBSU0..." />
              <InfoItem
                label="Fee (yearly normalized)"
                value="0.000 SSV ($0.00)"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <InfoItem
            label="Status"
            value="Inactive"
            valueClassName="text-red-500"
          />
          <InfoItem label="Performance 1H" value="No data (0 / 0)" />
          <InfoItem label="Performance 24H" value="No data (0 / 0)" />
          <InfoItem label="Performance 30D" value="No data" />
          <div className="text-sm text-gray-500 mt-2">Updated 23m ago</div>
        </div>

        <div className="flex gap-4">
          <button >0 Validators</button>
          <button >0 Duties</button>
          <button >Operator History</button>
        </div>
      </div>
    </div>
  );
};

interface InfoItemProps {
  label: string;
  value: string;
  link?: boolean;
  valueClassName?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({
  label,
  value,
  link = false,
  valueClassName = "",
}) => {
  return (
    <div className="mb-4">
      <div className="text-gray-500 text-sm mb-1">{label}</div>
      <div >
        {link ? (
          <Link
            href={value}
            className="text-blue-400 hover:underline flex items-center gap-1"
          >
            {value} <ExternalLink size={14} />
          </Link>
        ) : (
          value
        )}
      </div>
    </div>
  );
};

export default OperatorInfo;