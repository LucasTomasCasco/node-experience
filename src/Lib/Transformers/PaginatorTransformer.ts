import IPaginator from "../Contracts/IPaginator";
import Transformer from "../Transformer";

class PaginatorTransformer extends Transformer
{
    public transform(paginator: IPaginator)
    {
        return {
            'total': paginator.getTotal(),
            'count': paginator.getCount(),
            'currentUrl': paginator.getCurrentUrl(),
            'nextUrl': paginator.getNextUrl(),
        };
    }
}

export default PaginatorTransformer;