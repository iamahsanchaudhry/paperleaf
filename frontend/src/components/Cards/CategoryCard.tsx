import { Card, CardContent } from "../ui/card";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

function CategoryCard(props: any) {
  return (
    <Card className="group overflow-hidden rounded-2xl p-0 h-full border-0 shadow-md bg-white dark:bg-gray-800 transition-transform hover:-translate-y-2 hover:shadow-xl">
      <CardContent className="p-0">
        <div className="relative w-full h-56">
          <img
            src={props.item.image}
            alt={props.item.title}
            className="absolute inset-0 w-full h-full object-cover rounded-t-2xl"
          />
        </div>
        <div className="p-6 text-left">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">
            {props.item.title}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
            {props.item.description}
          </p>
          <Link to={props.item.link}>
            <Button
              variant="link"
              className="mt-3 px-0 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
            >
              View More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default CategoryCard;
