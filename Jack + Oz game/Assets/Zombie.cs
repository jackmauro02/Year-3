using UnityEngine;
using UnityEngine.AI;

public class Zombie : MonoBehaviour
{
    public float chaseRange = 10f;
    public float attackRange = 2f;
    public float obstacleAvoidanceRange = 5f;
    public float rotationSpeed = 5f;
    public float meleeDamage = 10f;

    public Transform player;
    private NavMeshAgent navMeshAgent;
    private Animator animator;

    private float health = 100f; // Initial health value
    private bool canAttack = true;
    private float meleeCooldown = 2f;
    private float meleeTimer = 0f;
    //public Jackfps jackFPS;
    public JackNoMove jackNoMove;
    public LogicScript logic;
    public float zombiePoints = 100f;
    public bool alive;

    private void Start()
    {
        player = GameObject.FindGameObjectWithTag("Player").transform;
        //jackFPS = GameObject.FindGameObjectWithTag("Player").GetComponent<Jackfps>();
        jackNoMove = GameObject.FindGameObjectWithTag("Player").GetComponent<JackNoMove>();
        navMeshAgent = GetComponent<NavMeshAgent>();
        animator = GetComponent<Animator>();
        alive = true;

    }

    private void Update()
    {
        if (alive == true)
        {
            float distanceToPlayer = Vector3.Distance(transform.position, player.position);

            // Chase the player if within chase range
            if ((distanceToPlayer <= chaseRange))

            {
                animator.SetFloat("Speed", 5);
                // Check if there's an obstacle between the zombie and the player
                if (!IsObstacleBetweenZombieAndPlayer())
                {
                    navMeshAgent.SetDestination(player.position);

                    // Rotate towards the player
                    Vector3 direction = (player.position - transform.position).normalized;
                    Quaternion lookRotation = Quaternion.LookRotation(new Vector3(direction.x, 0, direction.z));
                    transform.rotation = Quaternion.Slerp(transform.rotation, lookRotation, Time.deltaTime * rotationSpeed);

                    // Check if within attack range
                    if (distanceToPlayer > attackRange)
                    {
                        animator.SetBool("MeleeRange", false);
                    }
                    else if (distanceToPlayer <= attackRange)
                    {

                        if (canAttack)
                        {
                            // Perform melee attack
                            animator.SetBool("MeleeRange", true);
                            // Damage the player
                            //jackFPS.TakeDamage(meleeDamage);
                            //jackFPS.GetHealthValue();
                            jackNoMove.TakeDamage(meleeDamage);
                            jackNoMove.GetHealthValue();
                            // Start the cooldown timer
                            canAttack = false;
                            meleeTimer = meleeCooldown;
                            //player.GetComponent<Jackfps>().TakeDamage(meleeDamage);

                        }
                    }
                }
            }
        }

        // Handle melee cooldown
        //TODO
        if (!canAttack)
        {
            meleeTimer -= Time.deltaTime;

            if (meleeTimer <= 0f)
            {
                canAttack = true;
            }
        }

        // Set parameters for other animations (Idle, Run, Die)
        animator.SetFloat("Speed", 0);

        // ... (other code)
    }

    private bool IsObstacleBetweenZombieAndPlayer()
    {
        RaycastHit hit;
        Vector3 direction = (player.position - transform.position).normalized;

        if (Physics.Raycast(transform.position, direction, out hit, obstacleAvoidanceRange))
        {
            if (hit.collider.CompareTag("Obstacle"))
            {
                return true;
            }
        }

        return false;
    }

    // Method to apply damage to the zombie
    public void TakeDamage(float damage)
    {
        health -= damage;
        Debug.Log("Zombie health: " + health);

        // Check if the zombie is dead
        if (health <= 0)
        {
            Die();
            
        }
    }

    // Method to handle zombie death
    private void Die()
    {
        if (alive == true) {
        // Trigger death animation or perform other death-related actions
        animator.SetTrigger("Die");
        //animator.SetBool("Death", true);

        logic.addPoints(zombiePoints);

        // Collider collider = GetComponent<Collider>();
        // if (collider != null)
        // {
        //     collider.enabled = false;
        // }

        // Disable the script or GameObject if needed
        alive = false;
        // Alternatively, you can use gameObject.SetActive(false);
    }
    }
}
