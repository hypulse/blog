import SearchBox from "@/components/Search/SearchBox";
import TagCloud from "@/components/Search/TagCloud";

export default function Page() {
  return (
    <div className="space-y-6">
      <SearchBox />
      <TagCloud />
    </div>
  );
}
