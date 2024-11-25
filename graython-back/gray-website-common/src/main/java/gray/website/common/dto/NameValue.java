package gray.website.common.dto;


import gray.bingo.common.utils.SortUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.jetbrains.annotations.NotNull;

@Data
@AllArgsConstructor
public class NameValue implements Comparable<NameValue> {

    private String name;
    private String value;

    @Override
    public int compareTo(@NotNull NameValue o) {
        return SortUtil.strSort.compare(this.getName(), o.getName());
    }
}
