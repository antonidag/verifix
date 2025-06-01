from gpt_researcher import GPTResearcher
from utils import embed_text
from db import solutions
from services.solution_service import generate_confidence_score, process_solution_report
from services.inventory_service import store_model_info
from db import solutions, questions

async def process_research_report(question: str, researcher: GPTResearcher, solution_id: str):
    """Process and save a research report."""
    try:
        await researcher.conduct_research()
        report = await researcher.write_report()

        # Process report and extract data
        solution_data = await process_solution_report(report)
        solution_data['text'] = report
        solution_data['verified'] = False

        # Generate confidence score
        solution_data['confidence'] = await generate_confidence_score(solution_data)

        # Run database operations in parallel
        embedding = embed_text(question)
        solutions.update(solution_id, solution_data),
        questions.create({
            'text': question,
            'solution_id': solution_id,
            'embedding': embedding
        }),
        await store_model_info(solution_id, solution_data)

    except Exception as e:
        print(f"Error in process_research_report: {str(e)}")
        solutions.update(solution_id, {
            'text': f"Error generating report: {str(e)}",
            'error': True
        })
