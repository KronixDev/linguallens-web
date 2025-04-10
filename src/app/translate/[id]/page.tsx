import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase, Translation } from "@/lib/supabase";
import SharedMenuView from "@/components/shared/SharedMenuView";
import SharedProductView from "@/components/shared/SharedProductView";
import SharedDocumentView from "@/components/shared/SharedDocumentView";
import SharedGeneralView from "@/components/shared/SharedGeneralView";
import SharedReceiptView from "@/components/shared/SharedReceiptView";

// Génération des métadonnées dynamiques pour le SEO
export async function generateMetadata({ 
  params 
}: { 
  params: { id: string }
}): Promise<Metadata> {
  const { id } = params;
  
  try {
    const { data } = await supabase
      .from("translations")
      .select("*")
      .eq("id", id)
      .single();

    if (!data) {
      return {
        title: "Item not found | LinguaLens",
        description: "This item doesn't exist or has been deleted",
      };
    }

    return {
      title: `${data.translation_data.title || "Shared item"} | LinguaLens`,
      description: `Translation shared with LinguaLens: ${data.source_language} to ${data.target_language}`,
    };
  } catch {
    return {
      title: "Error | LinguaLens",
      description: "An error occurred while loading this item",
    };
  }
}

// Récupération des données de traduction
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { data } = await supabase
      .from("translations")
      .select("*")
      .eq("id", id)
      .single();

    if (!data) {
      notFound();
    }

    const translation = data as Translation;

    // Afficher le composant approprié en fonction du type de traduction
    switch (translation.translation_type) {
      case "menu":
        return <SharedMenuView translation={translation} />;
      case "product":
        return <SharedProductView translation={translation} />;
      case "document":
        return <SharedDocumentView translation={translation} />;
      case "receipt":
        return <SharedReceiptView translation={translation} />;
      case "general":
      case "text":
        return <SharedGeneralView translation={translation} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#121212] text-[#e8e8e6]">
            <h1 className="text-xl font-medium mb-2">Unsupported content type</h1>
            <p className="text-center text-[#e8e8e6]/70">
              This content type is not supported for sharing yet.
            </p>
          </div>
        );
    }
  } catch {
    notFound();
  }
}
