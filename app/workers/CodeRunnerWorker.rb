require 'sneakers'
puts "Including CodeRunnerWorker"
class CodeRunnerWorker
  include Sneakers::Worker
  from_queue 'rpc_queue'

  def work(msg)
    hash = JSON.parse(msg)
    result = Result.find(hash["result_id"])
    result.update({output:  "Shrikanth", status: :completed})
  end
end
